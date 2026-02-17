import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import generatePDF from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

import Button from "../../components/Button/Button";
import CustomerField from "../../components/CustomerField/CustomerField";
import { DateUiPicker } from "../../components/Datepicker/Datepicker";
import FormDataInput from "../../components/FormDataInput/FormDataInput";
import InputField from "../../components/InputField/InputField";
import PrintUi from "../../components/PrintUi/PrintUi";
import PrintUipdf from "../../components/PrintUipdf/PrintUipdf";
import MainLayout from "../../layouts/MainLayout";

import {
  AddIcon,
  PrinterIcon,
  SaveIcon,
  SavePdfIcon,
} from "../../components/icons";

import { createCustomer, getCustomers } from "../../api/customer";
import {
  createLocalEntry,
  getLocalEntryById,
  updateLocalEntry,
} from "../../api/localEntry";
import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";
import { useAuth } from "../../context/auth-context";
import { LOCALENTRY } from "../../router/paths";
import { setCurrentTime } from "../../utils/DatewithTime";

const LocalEntry = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editid");

  const navigate = useNavigate();
  const { role } = useAuth();

  const contentRef = useRef(null);
  const pdfRef = useRef(null);

  /* ---------------- STATE ---------------- */

  const [loading, setLoading] = useState(false);
  const [documentId, setDocumentId] = useState(null);

  const [billNo, setBillNo] = useState("");
  const [date, setDate] = useState(setCurrentTime(new Date()));
  const [note, setNote] = useState("");

  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [customerList, setCustomerList] = useState([]);

  const [flexData, setFlexData] = useState([]);
  const [cashData, setCashData] = useState([
    { cash_date: null, cash_amount: 0 },
  ]);
  const [gpayData, setGpayData] = useState([
    { gpay_date: null, gpay_amount: 0 },
  ]);

  const [error, setError] = useState("");

  /* ---------------- CALCULATIONS ---------------- */

  const totalAmount = useMemo(() => {
    return flexData.reduce(
      (sum, item) => sum + (Number.parseFloat(item.per_piece_total || 0) || 0),
      0,
    );
  }, [flexData]);

  console.log(totalAmount);

  const receivedAmount = useMemo(() => {
    const cashTotal = cashData.reduce(
      (sum, item) => sum + (Number.parseFloat(item.cash_amount || 0) || 0),
      0,
    );
    const gpayTotal = gpayData.reduce(
      (sum, item) => sum + (Number.parseFloat(item.gpay_amount || 0) || 0),
      0,
    );
    return cashTotal + gpayTotal;
  }, [cashData, gpayData]);

  const balanceAmount = useMemo(() => {
    return totalAmount - receivedAmount;
  }, [totalAmount, receivedAmount]);

  useEffect(() => {
    if (balanceAmount < 0) {
      setError("Balance cannot be negative");
    } else {
      setError("");
    }
  }, [balanceAmount]);

  /* ---------------- LOAD CUSTOMERS ---------------- */

  const loadCustomers = useCallback(async () => {
    try {
      const data = await getCustomers();
      setCustomerList(data);
    } catch {
      setCustomerList([]);
    }
  }, []);

  /* ---------------- LOAD EDIT ---------------- */

  const loadEditData = useCallback(async (id) => {
    try {
      const data = await getLocalEntryById(id);
      if (!data) return;

      setDocumentId(data.documentId);
      setBillNo(data.bill_no);
      setDate(data.date);
      setNote(data.note);

      setCustomerId(data.customer?.documentId);
      setCustomerName(data.customer?.name);
      setPhone(data.customer?.phonenumber);

      setFlexData(data.flex || []);
      setCashData(data.cash || []);
      setGpayData(data.gpay || []);
    } catch {
      toast.error("Failed to load entry");
    }
  }, []);

  useEffect(() => {
    loadCustomers();
    if (editId) loadEditData(editId);
  }, [editId, loadCustomers, loadEditData]);

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (flexData.length === 0) {
      toast.error("Please add at least one size");
      return;
    }

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      let finalCustomerId = customerId;

      if (!customerId) {
        if (!customerName.trim()) {
          toast.error("Customer name is required");
          return;
        }

        const createdCustomer = await createCustomer({
          name: customerName,
          phonenumber: phone,
        });

        finalCustomerId = createdCustomer.documentId;
        setCustomerId(finalCustomerId);
        await loadCustomers();
      }

      const payload = {
        bill_no: billNo,
        date,
        note,
        customer: finalCustomerId,
        flex: flexData,
        cash: cashData,
        gpay: gpayData,
        recieved_amount: receivedAmount,
        balance_amount: balanceAmount,
        total_amount: totalAmount,
        current_state: balanceAmount === 0 ? "paid" : "pending",
      };

      if (!documentId) {
        const created = await createLocalEntry(payload);
        setDocumentId(created.documentId);
        toast.success("Local entry created successfully");
      } else {
        await updateLocalEntry(documentId, payload);
        toast.success("Local entry updated successfully");
      }
    } catch {
      toast.error("Failed to save entry");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- PRINT ---------------- */

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Bill-${billNo}`,
    onAfterPrint: () => toast.success("Print successful"),
  });

  /* ---------------- CLEAR ---------------- */

  const clearForm = () => {
    setDocumentId(null);
    setBillNo("");
    setDate(setCurrentTime(new Date()));
    setNote("");
    setCustomerId("");
    setCustomerName("");
    setPhone("");
    setFlexData([]);
    setCashData([{ cash_date: null, cash_amount: 0 }]);
    setGpayData([{ gpay_date: null, gpay_amount: 0 }]);
    navigate(LOCALENTRY);
  };

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <h1 className="text-2xl font-medium">Local Entry</h1>

      <div className="flex justify-end">
        <Button
          onClick={clearForm}
          label="Add New"
          icon1={<AddIcon color="#fff" />}
          className="bg-[#0b6bcb] text-white border-0"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="grid grid-cols-4 gap-4 my-2">
          {role === "superadmin" && (
            <>
              <DateUiPicker
                value={date}
                label="Date"
                onChange={(d) => setDate(setCurrentTime(d))}
              />
              <InputField
                placeholder="Bill No"
                value={billNo}
                onChange={(e) => setBillNo(e.target.value)}
              />
            </>
          )}

          <InputField
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <CustomerField
          customerData={customerList}
          fetchCustomers={loadCustomers}
          setCustomerData={setCustomerList}
          SelectCustomerID={customerId}
          setSelectedCustomerID={setCustomerId}
          customerName={customerName}
          setCustomerName={setCustomerName}
          phoneno={phone}
          setPhoneno={setPhone}
        />

        <FormDataInput formData={flexData} setFormData={setFlexData} />

        <div className="grid grid-cols-4 gap-4 mt-4 mb-12">
          <CurrencyConverter amount={totalAmount} label="Total Amount" />
          <CurrencyConverter amount={receivedAmount} label="Received Amount" />
          <CurrencyConverter
            amount={balanceAmount}
            label="Balance Amount"
            error={error}
          />
        </div>

        <div className="flex justify-end gap-4">
          {documentId && (
            <>
              <Button
                label="Save as PDF"
                onClick={() => generatePDF(pdfRef, { filename: "bill.pdf" })}
                icon1={<SavePdfIcon color="#fff" />}
                className="bg-green-600 text-white"
              />
              <Button
                label="Print"
                onClick={handlePrint}
                icon1={<PrinterIcon color="#fff" />}
                className="bg-blue-600 text-white"
              />
            </>
          )}

          <Button
            type="submit"
            label={documentId ? "Update" : "Save"}
            icon1={<SaveIcon color="#fff" />}
            disabled={loading}
            className="bg-indigo-600 text-white"
          />
        </div>
      </form>

      <PrintUi
        ref={contentRef}
        billno={billNo}
        name={customerName}
        date={dayjs(date).format("DD-MM-YYYY")}
        amount={totalAmount}
        advance={receivedAmount}
        balance={balanceAmount}
        sizedata={flexData}
      />

      <div className="hidden">
        <PrintUipdf
          ref={pdfRef}
          billno={billNo}
          name={customerName}
          date={dayjs(date).format("DD-MM-YYYY")}
          amount={totalAmount}
          advance={receivedAmount}
          balance={balanceAmount}
          sizedata={flexData}
        />
      </div>
    </MainLayout>
  );
};

export default LocalEntry;
