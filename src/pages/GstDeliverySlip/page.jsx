import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { getGstList } from "../../api/gstList";

import AutocompleteField from "../../components/AutocompleteField/AutocompleteField";
import Button from "../../components/Button/Button";
import DeliveryUi from "../../components/DeliveryUi/DeliveryUi";
import { PrinterIcon } from "../../components/icons";
import MainLayout from "../../layouts/MainLayout";

const GstDeliverySlip = () => {
  const contentRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [gstSalesData, setGstSalesData] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  const loadBills = useCallback(async () => {
    setLoading(true);

    try {
      const query = new URLSearchParams();

      query.set("pagination[page]", "1");
      query.set("pagination[pageSize]", "500");
      query.set("sort[0]", "date:desc");

      const response = await getGstList(query.toString());

      setGstSalesData(response?.data || []);
    } catch (error) {
      console.error("Failed to load bills:", error);
      setGstSalesData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBills();
  }, [loadBills]);

  const billOptions = useMemo(
    () =>
      gstSalesData
        .filter((item) => item.bill_no)
        .map((item) => ({
          label: item.bill_no,
          value: item.documentId,
        })),
    [gstSalesData],
  );

  const selectedBillData = useMemo(() => {
    if (!selectedBill?.value) return null;

    return (
      gstSalesData.find((item) => item.documentId === selectedBill.value) ||
      null
    );
  }, [selectedBill, gstSalesData]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Delivery Slip</h1>

        <div className="grid grid-cols-2 gap-4 max-w-4xl">
          <AutocompleteField
            label="Bill Number"
            placeholder="Select Bill Number"
            value={selectedBill}
            options={billOptions}
            onChange={(_, value) => setSelectedBill(value)}
          />

          <Button
            label="Print Bill"
            onClick={handlePrint}
            disabled={!selectedBillData}
            icon1={<PrinterIcon color="#fff" />}
            icon2={<PrinterIcon color="#fff" />}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-0 w-fit h-[40px] mt-5"
          />
        </div>

        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="mt-6">
            <DeliveryUi
              ref={contentRef}
              billno={selectedBillData?.bill_no}
              date={selectedBillData?.date}
              name={selectedBillData?.gst_customer?.name}
              sizedata={selectedBillData?.size_data || []}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GstDeliverySlip;
