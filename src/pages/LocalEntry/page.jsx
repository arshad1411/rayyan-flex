import { useCallback, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import CustomerField from "../../components/CustomerField/CustomerField";
import { DateUiPicker } from "../../components/Datepicker/Datepicker";
import FormDataInput from "../../components/FormDataInput/FormDataInput";
import { AddIcon } from "../../components/icons";
import InputField from "../../components/InputField/InputField";
import PrintUi from "../../components/PrintUi/PrintUi";
import PrintUipdf from "../../components/PrintUipdf/PrintUipdf";
import MainLayout from "../../layouts/MainLayout";

import dayjs from "dayjs";
import generatePDF from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import CashIcon from "../../components/icons/CashIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import GpayIcon from "../../components/icons/GpayIcon";
import PrinterIcon from "../../components/icons/PrinterIcon";
import SaveIcon from "../../components/icons/SaveIcon";
import CurrencyConverter from "../../utils/CurrencyConverter";
import { setCurrentTime } from "../../utils/DatewithTime";

const LocalEntryPage = () => {
  const [serialNo, setSerialNo] = useState("");
  const [changeDate, setChangeDate] = useState(setCurrentTime(new Date()));
  const [Notes, setNotes] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [CustomerData, setCustomerData] = useState([]);
  const [selectCustomerID, setSelectCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [formData, setFormData] = useState([]);
  const contentRef = useRef(null);
  const pdfref = useRef(null);
  const [cashData, setCashData] = useState([{ date: null, amount: "" }]);
  // eslint-disable-next-line no-unused-vars
  const [gpayData, setGpayData] = useState([{ date: null, amount: "" }]);
  const [amount, setAmount] = useState(0);
  const [cashErrorMsg, setCashErrorMsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [gpayErrorMsg, setGpayErrorMsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [balance, setbalance] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errorBool, setErrorBool] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [Status, setStatus] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [EditID, setEditID] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [Advance, setAdvance] = useState(0);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Bill-${serialNo}`,
    onAfterPrint: () => toast.success("Print successful"),
  });

  // Calculate the total amount
  const calculateTotalAmount = useCallback((formData) => {
    const total = formData.reduce((sum, item) => {
      return sum + (Number.parseFloat(item.total) || 0);
    }, 0);
    const finalAmount = Math.round(total).toFixed(2);
    setAmount(finalAmount);
  }, []);

  //handle change
  const handleCashChange = useCallback(
    (index, e, name) => {
      let value;
      if (name) {
        value = e;
      } else {
        ({ name, value } = e.target);
      }

      const updatedCashData = [...cashData];
      updatedCashData[index][name] = value;
      setCashData(updatedCashData);
    },
    [cashData],
  );

  //handle add
  const handleAddCashRow = useCallback(() => {
    setCashErrorMsg("");
    const activeRow = cashData[cashData.length - 1];

    if (activeRow.date === null || activeRow.amount === 0) {
      setCashErrorMsg("Please enter date and amount");
      return;
    }

    setCashData([...cashData, { date: null, amount: 0 }]);
  }, [cashData]);

  //handleremove
  const handleRemoveCashRow = useCallback(
    (index) => {
      const updatedCashData = [...cashData];
      updatedCashData.splice(index, 1);
      setCashData(updatedCashData);
    },
    [cashData],
  );
  //gpay change
  const handleGpayChange = useCallback(
    (index, e, name) => {
      let value;
      if (name) {
        value = e;
      } else {
        ({ name, value } = e.target);
      }

      const updatedGpayData = [...gpayData];
      updatedGpayData[index][name] = value;
      setGpayData(updatedGpayData);
    },
    [gpayData],
  );
  //add gpay row
  const handleAddGpayRow = useCallback(() => {
    setGpayErrorMsg("");
    const activeRow = gpayData[gpayData.length - 1];

    if (activeRow.date === null || activeRow.amount === 0) {
      setGpayErrorMsg("Please enter date and amount");
      return;
    }

    setGpayData([...gpayData, { date: null, amount: 0 }]);
  }, [gpayData]);
  //remove gpay row
  const handleRemoveGpayRow = useCallback(
    (index) => {
      if (gpayData.length === 1) return;

      const newGpayData = [...gpayData];
      newGpayData.splice(index, 1);
      setGpayData(newGpayData);
    },
    [gpayData],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <MainLayout>
      <h1 className="text-2xl font-medium  mb-4">Local Entry</h1>
      <div className="flex justify-end">
        <Button
          onClick={() => ""}
          label={"Add New"}
          icon1={<AddIcon />}
          icon2={<AddIcon />}
          classvalues={"bg-[#0b6bcb] text-white border-0"}
        />
      </div>
      <form onSubmit={handleSubmit} id="flexform">
        <div className="grid grid-cols-3 gap-4  font-semibold my-2">
          {
            <>
              <div className="flex flex-col" style={{ lineHeight: "10px" }}>
                <label className="text-base">Date</label>
                <div className="relative">
                  <DateUiPicker
                    onChange={(newValue) => {
                      const gettime = setCurrentTime(newValue);
                      setChangeDate(gettime);
                    }}
                    label="Date"
                    value={changeDate}
                    className={"w-full"}
                  />
                </div>
              </div>
              <div>
                <InputField
                  name={"bill_no"}
                  placeholder={"Bill No"}
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                />
              </div>
            </>
          }

          <div>
            <InputField
              name={"note"}
              placeholder={"Note"}
              value={Notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <CustomerField
          customerData={CustomerData}
          SelectCustomerID={selectCustomerID}
          setSelectedCustomerID={setSelectCustomerID}
          setCustomerName={setCustomerName}
          customerName={customerName}
          setPhoneno={setPhoneno}
          phoneno={phoneno}
        />

        <FormDataInput
          formData={formData}
          setFormData={setFormData}
          calculateTotalAmount={calculateTotalAmount}
        />
        <div className="grid grid-cols-4 gap-4 mt-4 mb-12">
          <div className="flex flex-col">
            <p className="text-base font-semibold">Total Amount</p>
            <CurrencyConverter amount={amount} />
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold">Total Balance</p>
            <CurrencyConverter amount={balance} />
            {errorBool && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r-2 border-gray-300">
            <div>
              {cashData.map((cashRow, index) => (
                <div className="grid grid-cols-3 gap-3mb-2" key={index}>
                  <div className="flex flex-col col-span-1   font-semibold  relative">
                    <label className="text-base">Cash Date</label>
                    <DateUiPicker
                      value={cashRow.date ? dayjs(cashRow.date) : null}
                      onChange={(newValue) => {
                        if (!newValue) {
                          handleCashChange(index, null, "date");
                        } else {
                          const gettime = setCurrentTime(newValue);
                          handleCashChange(index, gettime, "date");
                        }
                      }}
                      label="Cash Date"
                      // minDate={role === "superadmin" ? false : new Date()}
                      disabled={Status?.cash[index]}
                      isClearable={true}
                      className={`disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400`}
                    />
                  </div>
                  <div className="flex gap-2 col-span-2 font-semibold mr-3">
                    <InputField
                      name={"amount"}
                      type={"number"}
                      placeholder={"Cash Amount"}
                      value={cashRow.amount}
                      onChange={(e) => handleCashChange(index, e)}
                      disabled={Status?.cash[index]}
                      className={`disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400`}
                    />

                    <Button
                      onClick={() => handleRemoveCashRow(index)}
                      icon1={<DeleteIcon color="#fff" />}
                      icon2={<DeleteIcon color="#000" />}
                      disabled={Status?.cash[index]}
                      classvalues={
                        "h-[38px] mt-5.5 border-gray-400 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400  disabled:bg-gray-300"
                      }
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end items-center mt-4 mr-3 gap-4">
                <p className="text-red-500">{cashErrorMsg}</p>

                <Button
                  onClick={handleAddCashRow}
                  label={"Add Cash"}
                  icon1={<CashIcon />}
                  icon2={<CashIcon color="#292D32" />}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              {gpayData.map((gpayRow, index) => (
                <div className="grid grid-cols-3 gap-3 mb-2 " key={index}>
                  <div className="flex flex-col col-span-1  font-semibold relative">
                    <label className="text-base">Gpay Date</label>
                    <DateUiPicker
                      value={gpayRow.date ? dayjs(gpayRow.date) : null}
                      onChange={(newValue) => {
                        if (!newValue) {
                          handleGpayChange(index, null, "date");
                        } else {
                          const gettime = setCurrentTime(newValue);
                          handleGpayChange(index, gettime, "date");
                        }
                      }}
                      label="Gpay Date"
                      isClearable={true}
                      disabled={Status?.gpay[index]}
                      className={`disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400`}
                    />
                  </div>
                  <div className="flex gap-2 col-span-2 font-semibold mr-3">
                    <InputField
                      name={"amount"}
                      placeholder={"Gpay Amount"}
                      value={gpayRow.amount}
                      onChange={(e) => handleGpayChange(index, e)}
                      disabled={Status?.gpay[index]}
                      className={`disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400`}
                    />
                    <Button
                      onClick={() => handleRemoveGpayRow(index)}
                      icon1={<DeleteIcon color="#fff" />}
                      icon2={<DeleteIcon color="#000" />}
                      classvalues={
                        "h-[38px] mt-5.5 border-gray-400 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-300"
                      }
                      disabled={Status?.gpay[index]}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end items-center mt-4 font-semibold gap-4">
                <p className="text-red-500">{gpayErrorMsg}</p>

                <Button
                  onClick={handleAddGpayRow}
                  label={"Add Gpay"}
                  icon1={<GpayIcon />}
                  icon2={<GpayIcon color="#292D32" />}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 mt-10">
          {EditID && (
            <>
              <Button
                label={"Save as PDF"}
                icon1={<SavePdfIcon color="#fff" />}
                icon2={<SavePdfIcon color="#fff" />}
                classvalues={
                  "bg-[#10B981] hover:bg-[#059669] text-white border-0"
                }
                onClick={() => generatePDF(pdfref, { filename: "page.pdf" })}
              />

              <Button
                label={"Print Bill"}
                onClick={() => reactToPrintFn()}
                icon1={<PrinterIcon color="#fff" />}
                icon2={<PrinterIcon color="#fff" />}
                classvalues={
                  "bg-[#2563EB] hover:bg-[#0049e9] text-white border-0"
                }
              />
            </>
          )}
          <Button
            type={"submit"}
            form={"flexform"}
            label={EditID ? "Update" : "Save"}
            icon1={<SaveIcon color="#fff" />}
            icon2={<SaveIcon color="#fff" />}
            classvalues={
              "bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-lg border-0"
            }
            disabled={""}
          />
        </div>
      </form>
      <PrintUi
        ref={contentRef}
        billno={serialNo}
        name={customerName}
        date={dayjs(changeDate).format("DD-MM-YYYY")}
        amount={amount}
        advance={Advance}
        balance={balance}
        sizedata={formData}
      />
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <PrintUipdf
          ref={pdfref}
          billno={serialNo}
          name={customerName}
          date={dayjs(changeDate).format("DD-MM-YYYY")}
          amount={amount}
          advance={Advance}
          balance={balance}
          sizedata={formData}
        />
      </div>
    </MainLayout>
  );
};

export default LocalEntryPage;
