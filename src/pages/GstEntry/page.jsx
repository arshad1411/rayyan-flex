import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

import {
  createLocalList,
  getLastLocalList,
  getLocalListById,
  updateLocalList,
} from "../../api/localList";

import { toPng } from "html-to-image";

import { useAuth } from "../../context/auth-context";
import { LOCALENTRY } from "../../router/paths";
import { setCurrentTime } from "../../utils/DatewithTime";
import { formattedAmount } from "../../utils/FormatAmount";
import { transformBillingData } from "../../utils/transformBillingData";
import { createGstCustomer, getGstCustomers } from "../../api/gstCustomer";

const num = (v) => Number(v) || 0;

const GstEntry = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");

  const navigate = useNavigate();
  const { role } = useAuth();

  const contentRef = useRef(null);
  const printRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [documentId, setDocumentId] = useState(null);

  const [billNo, setBillNo] = useState("");
  const [date, setDate] = useState(setCurrentTime(new Date()));
  const [hsnCode, setHsnCode] = useState("");
  const [uom, setUom] = useState("");

  const [method, setMethod] = useState("gst");
  const [gstPercentage, setGstPercentage] = useState("18");

  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [customerList, setCustomerList] = useState([]);

  const [sizeData, setSizeData] = useState([]);

  const [status, setStatus] = useState("status");

  const loadLastBillNo = useCallback(async () => {
    try {
      const res = await getLastLocalList();
      const lastEntry = res?.[0];

      if (lastEntry?.bill_no) {
        const lastBill = Number(lastEntry.bill_no) || 0;
        setBillNo(String(lastBill + 1));
      } else {
        setBillNo("1");
      }
    } catch (err) {
      console.log(err);
      setBillNo("1");
    }
  }, []);

  const totalAmount = useMemo(() => {
    const sizeTotal = sizeData.reduce(
      (sum, item) => sum + num(item.per_piece_total),
      0,
    );

    return sizeTotal;
  }, [sizeData]);

  const loadCustomers = useCallback(async () => {
    try {
      const data = await getGstCustomers();
      setCustomerList(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomerList([]);
    }
  }, []);

  const loadEditData = useCallback(async (id) => {
    try {
      const res = await getLocalListById(id);

      const data = res?.data?.[0] || res?.data || res;

      if (!data) return;

      setDocumentId(data.documentId);
      setBillNo(data.bill_no);
      setDate(data.date);
      setHsnCode(data.hsn_code);
      setUom(data.uom);

      setCustomerName(data.customer?.name);

      const cleanedData = transformBillingData(data);

      setCustomerId(cleanedData.customer || "");

      setSizeData(cleanedData.size_data || []);

      setStatus(data.current_status || "status");
    } catch {
      toast.error("Failed to load entry");
    }
  }, []);

  useEffect(() => {
    loadCustomers();

    if (editId) {
      loadEditData(editId);
    } else {
      loadLastBillNo();
    }
  }, [editId, loadCustomers, loadEditData, loadLastBillNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sizeData.length === 0) {
      toast.error("Please add at least one size");
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

        const createdCustomer = await createGstCustomer({
          name: customerName,
          address: address,
          gst_no: gstNo,
        });

        finalCustomerId = createdCustomer?.data?.documentId;
        setCustomerId(finalCustomerId);

        await loadCustomers();
      }

      const particulars = sizeData
        .map((s) => {
          if (s.type === "instruction") {
            return {
              text: `${s.instruction} - ${s.piece_count} pcs - ${formattedAmount(
                s.per_piece_total,
              )}`,
            };
          }

          if (s.type === "flex") {
            return {
              text: `${s.width} x ${s.height} ${s.material} - ${s.sq_ft_price} sqft - ${s.piece_count} pcs - ${formattedAmount(
                s.per_piece_total,
              )}`,
            };
          }

          return null;
        })
        .filter(Boolean);

      const payload = {
        bill_no: billNo,
        date,
        hsn_code: hsnCode,
        uom,
        customer: finalCustomerId,
        size_data: sizeData,

        total_amount: totalAmount,
        particulars,
        current_status: status,
      };

      if (!documentId) {
        const created = await createLocalList(payload);
        setDocumentId(created?.documentId);
        toast.success("Local list created successfully");
      } else {
        await updateLocalList(documentId, payload);

        toast.success("Local list updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save entry");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Bill-${billNo}`,
  });

  const downloadImage = async () => {
    if (printRef.current === null) return;

    try {
      const dataUrl = await toPng(printRef.current, {
        pixelRatio: 3,
        backgroundColor: "#ffffff",
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `Invoice-${billNo}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };
  const clearForm = async () => {
    setDocumentId(null);
    setDate(setCurrentTime(new Date()));
    setHsnCode("");
    setUom("");

    setCustomerId("");
    setCustomerName("");
    setAddress("");
    setGstNo("");

    setSizeData([]);

    await loadLastBillNo();

    navigate(LOCALENTRY);
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-medium">Gst Entry</h1>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={clearForm}
          label="Add New"
          icon1={<AddIcon color="#fff" />}
          icon2={<AddIcon color="#fff" />}
          className="bg-[#0b6bcb] text-white border-0"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="grid grid-cols-4 gap-4 my-2">
          <InputField
            placeholder="Bill No"
            value={billNo}
            disabled={role !== "superadmin"}
            onChange={(e) => setBillNo(e.target.value)}
          />
          <DateUiPicker
            value={date}
            label="Date"
            disabled={role !== "superadmin"}
            onChange={(d) => setDate(setCurrentTime(d))}
          />

          <InputField
            placeholder="HSN/SAC Code"
            value={hsnCode}
            onChange={(e) => setHsnCode(e.target.value)}
          />
          <InputField
            placeholder="UOM"
            value={uom}
            onChange={(e) => setUom(e.target.value)}
          />
        </div>

        <CustomerField
          isGstCustomer={true}
          customerData={customerList}
          fetchCustomers={loadCustomers}
          setCustomerData={setCustomerList}
          SelectCustomerID={customerId}
          setSelectedCustomerID={setCustomerId}
          customerName={customerName}
          setCustomerName={setCustomerName}
          gstNo={gstNo}
          setGstNo={setGstNo}
          address={address}
          setAddress={setAddress}
        />

        <FormDataInput sizeData={sizeData} setSizeData={setSizeData} />

        <div className="grid grid-cols-2 gap-4 my-2">
          <InputField
            placeholder="Method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
          <InputField
            placeholder="Gst Percentage"
            value={gstPercentage}
            onChange={(e) => setGstPercentage(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 my-2">
          <InputField placeholder="Amount" value={""} readOnly />
          <InputField placeholder="Total Amount" value={totalAmount} readOnly />
        </div>

        <div className="flex justify-end gap-4">
          {documentId && (
            <>
              <Button
                type="button"
                label="Save as PDF"
                onClick={downloadImage}
                icon1={<SavePdfIcon color="#fff" />}
                icon2={<SavePdfIcon color="#fff" />}
                className="bg-green-600 text-white"
              />

              <Button
                type="button"
                label="Print"
                onClick={handlePrint}
                icon1={<PrinterIcon color="#fff" />}
                icon2={<PrinterIcon color="#fff" />}
                className="bg-[#14B8A6] text-white"
              />
            </>
          )}

          <Button
            type="submit"
            label={documentId ? "Update" : "Save"}
            icon1={<SaveIcon color="#fff" />}
            icon2={<SaveIcon color="#fff" />}
            disabled={loading}
            className="bg-indigo-600 text-white"
          />
        </div>
      </form>
      {/* 
      <PrintUi
        ref={contentRef}
        billNo={billNo}
        name={customerName}
        date={dayjs(date).format("DD-MM-YYYY")}
        amount={totalAmount}
        advance={receivedAmount}
        balance={balanceAmount}
        sizeData={sizeData}
      /> */}

      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        {/* <PrintUipdf
          ref={printRef}
          billNo={billNo}
          name={customerName}
          date={dayjs(date).format("DD-MM-YYYY")}
          amount={totalAmount}
          advance={receivedAmount}
          balance={balanceAmount}
          sizeData={sizeData}
        /> */}
      </div>
    </MainLayout>
  );
};

export default GstEntry;
