import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Table,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AutocompleteField from "../../components/AutocompleteField/AutocompleteField";
import CardUI from "../../components/CardUI/CardUI";
import Datepicker, {
  DateUiPicker,
} from "../../components/Datepicker/Datepicker";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import EditButton from "../../components/EditButton/EditButton";

import MainLayout from "../../layouts/MainLayout";

import { GSTSALESENTRY } from "../../router/paths";
import dayjs from "../../utils/dayjs";
import { formattedAmount } from "../../utils/FormatAmount";

import { getGstCustomers } from "../../api/gstCustomer";
import { createGstList, getGstList, updateGstList } from "../../api/gstList";
import { getGstSalesSummary } from "../../api/gstsales";
import { deleteLocalList } from "../../api/localList";
import Button from "../../components/Button/Button";
import {
  CheckBoxIcon,
  CheckIcon,
  SaveIcon,
  WalletIcon,
} from "../../components/icons";
import LeftArrowIcon from "../../components/icons/LeftArrowIcon";
import RightIcon from "../../components/icons/RightIcon";
import InputField from "../../components/InputField/InputField";
import SelectField from "../../components/SelectField/SelectField";
import { useAuth } from "../../context/auth-context";
import { setCurrentTime } from "../../utils/DatewithTime";

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count}`;
}

const GstSalesList = () => {
  const { role, showOverview, toggleOverview } = useAuth();
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchCustomer, setSearchCustomer] = useState(null);

  const [gstCustomers, setGstCustomers] = useState([]);
  const [gstSalesData, setGstSalesData] = useState([]);
  const [gstSalesSummary, setGstSalesSummary] = useState([]);

  const [billNosData, setBillNosData] = useState([]);
  const [recvBillNo, setRecvBillNo] = useState([]);
  const [totalBillAmount, setTotalBillAmount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalCount, setTotalCount] = useState(0);

  const [date, setDate] = useState(setCurrentTime(new Date()));
  const [customType, setCustomType] = useState("gpay");
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [editId, setEditId] = useState("");
  const [particulars, setParticulars] = useState("");

  /* ================= LOAD CUSTOMERS ================= */

  const loadGstCustomers = useCallback(async () => {
    try {
      const res = await getGstCustomers();
      setGstCustomers(res || []);
    } catch (error) {
      console.error("Customer fetch failed:", error);
      setGstCustomers([]);
    }
  }, []);

  /* ================= API QUERY BUILDER ================= */

  const buildQuery = () => {
    const query = [];

    query.push(`pagination[page]=${page + 1}`);
    query.push(`pagination[pageSize]=${rowsPerPage}`);
    query.push(`sort[0]=date:desc`);

    if (searchCustomer?.value) {
      query.push(
        `filters[gst_customer][documentId][$eq]=${searchCustomer.value}`,
      );
    }

    if (fromDate && toDate) {
      query.push(`filters[date][$gte]=${dayjs(fromDate).format("YYYY-MM-DD")}`);
      query.push(`filters[date][$lte]=${dayjs(toDate).format("YYYY-MM-DD")}`);
    }

    return query.join("&");
  };

  /* ================= LOAD DATA ================= */

  const loadGstSalesData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getGstList(buildQuery());

      setGstSalesData(res?.data || []);
      setTotalCount(res?.meta?.pagination?.total || 0);
    } catch (error) {
      console.error("Gst sales fetch failed:", error);
      toast.error("Failed to load gst sales list");
      setGstSalesData([]);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchCustomer, fromDate, toDate]);

  const loadGstSalesSummary = useCallback(async () => {
    setLoading(true);

    try {
      let query = [];

      if (searchCustomer) {
        query.push(
          `filters[gst_customer][documentId][$eq]=${searchCustomer.value}`,
        );
      }

      if (fromDate && toDate) {
        const from = dayjs(fromDate).format("YYYY-MM-DD");
        const to = dayjs(toDate).format("YYYY-MM-DD");

        query.push(`fromDate=${from}`);
        query.push(`toDate=${to}`);
      }

      const queryString = query.length ? `?${query.join("&")}` : "";

      const res = await getGstSalesSummary(queryString);

      setGstSalesSummary(res);
    } catch (error) {
      console.error("Gst sales summary fetch failed:", error);
      setGstSalesSummary([]);
    } finally {
      setLoading(false);
    }
  }, [searchCustomer, fromDate, toDate]);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    loadGstCustomers();
  }, [loadGstCustomers]);

  useEffect(() => {
    loadGstSalesData();
  }, [loadGstSalesData]);

  useEffect(() => {
    loadGstSalesSummary();
  }, [loadGstSalesSummary]);

  useEffect(() => {
    const billList = gstSalesData
      .filter((item) => item.bill_no && item.current_status !== "paid")
      .map((item) => ({
        label: `${item.bill_no} - ₹${item.total_amount}`,
        value: item.documentId,
        amount: item.total_amount,
        bill_no: item.bill_no,
      }));

    setBillNosData(billList);
  }, [gstSalesData]);

  useEffect(() => {
    const total = recvBillNo.reduce((sum, item) => {
      return sum + (item.amount || 0);
    }, 0);

    setTotalBillAmount(total);
  }, [recvBillNo]);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await deleteLocalList(id);
      toast.success("Deleted successfully");
      loadGstSalesData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* ================= PAGINATION ================= */

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (_, value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    return Math.min((page + 1) * rowsPerPage, totalCount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date,
      customer: searchCustomer.value,
      custom_type: customType,
      particulars: [{ text: particulars }],
      method: customType,
      current_status: "party",
      approved: true,
    };
    if (!editId) {
      await createGstList(payload);
      toast.success("Party Amount added successfully");
    } else {
      await updateGstList(editId, payload);
      toast.success("Party Amount updated successfully");
    }

    loadGstSalesData();
    setEditId("");
    setDate(new Date());
    setSearchCustomer("");
    setParticulars("");
    setCustomType("gpay");
    setReceivedAmount(0);
  };

  const handleEdit = (item) => {
    setEditId(item.documentId);
    setDate(new Date(item.date));
    setSearchCustomer({
      label: item.customer?.name,
      value: item.customer?.documentId,
    });
    setParticulars(item.particulars?.[0]?.text || "");
    setCustomType(item.custom_type || "gpay");
    setReceivedAmount(
      item.custom_type === "cash" ? item.cash_received : item.gpay_received,
    );
  };

  const handleStatusChange = async (id, value) => {
    try {
      await updateGstList(id, { current_status: value });

      await loadGstSalesData();
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Gst Sales List</h1>
        <Checkbox
          icon={<CheckBoxIcon />}
          checkedIcon={<CheckIcon color="#fff" />}
          checked={showOverview}
          style={{ marginRight: 8 }}
          label={"Show Overview"}
          onChange={() => toggleOverview()}
        />
      </div>

      {showOverview && (
        <motion.div
          className="flex gap-4 items-center justify-start mt-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <CardUI
            title="Total Cash"
            amount={gstSalesSummary?.total_cash}
            icon={<WalletIcon />}
            titleColor="text-green-800"
          />
          <CardUI
            title="Total Gpay"
            amount={gstSalesSummary?.total_gpay}
            icon={<WalletIcon />}
            titleColor="text-green-800"
          />
          <CardUI
            title="Total Balance"
            amount={gstSalesSummary?.total_balance}
            icon={<WalletIcon />}
            titleColor="text-green-800"
          />
        </motion.div>
      )}

      {/* Filters */}

      <div className="flex gap-4 items-center">
        <Datepicker
          type="multipleDatePicker"
          FromDate={fromDate}
          ToDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </div>

      <div className="flex justify-end mt-6">
        <div className="w-80">
          <AutocompleteField
            label="Customer Name"
            value={searchCustomer}
            options={gstCustomers.map((c) => ({
              label: c.name,
              value: c.documentId,
            }))}
            onChange={(e, val) => {
              setSearchCustomer(val);
              setPage(0);
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-6 gap-4 ">
          <DateUiPicker
            value={date}
            label="Date"
            onChange={(d) => setDate(setCurrentTime(d))}
            className={"w-full"}
            minDate={role === "superadmin" ? false : new Date()}
          />
          <AutocompleteField
            label="Customer Name"
            value={searchCustomer}
            options={gstCustomers.map((c) => ({
              label: c.name,
              value: c.documentId,
            }))}
            onChange={(e, val) => {
              setSearchCustomer(val);
              setPage(0);
            }}
          />

          <div>
            <label>Bill Number (₹ {totalBillAmount})</label>

            <Autocomplete
              multiple
              options={billNosData}
              value={recvBillNo}
              onChange={(e, newValue) => setRecvBillNo(newValue)}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxIcon />}
                    checkedIcon={<CheckIcon color="#fff" />}
                    checked={selected}
                    style={{ marginRight: 8 }}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Bill Number" />
              )}
            />
          </div>
          <SelectField
            label={"Received In"}
            selectName={"custom_type"}
            options={[
              { value: "cash", label: "Cash" },
              { value: "gpay", label: "Gpay" },
            ]}
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            placeholder={"Received In"}
            required={true}
          />
          <InputField
            name={"received amount"}
            placeholder={"Received Amount"}
            value={receivedAmount}
            onChange={(e) => setReceivedAmount(e.target.value) || 0}
          />
          <Button
            type={"submit"}
            label={editId ? "Save" : "Update"}
            icon1={<SaveIcon color="#fff" />}
            icon2={<SaveIcon color="#fff" />}
            className={"bg-[#4F46E5] hover:bg-[#4338CA] text-white"}
          />
        </div>
      </form>

      {/* Table */}

      <div className="mt-8">
        <Table borderAxis="both" hoverRow>
          <thead>
            <tr>
              <th className="w-[10%]">Date</th>
              <th className="w-[5%]">Bill No</th>
              <th className="w-[10%]">Customer</th>
              <th className="w-[7%]">Base Amount </th>
              <th className="w-[14%]">Tax</th>
              <th className="w-[16%]">Total Amount</th>
              <th className="w-[16%]">Received Bill Nos</th>
              <th className="w-[16%]">Received Amount</th>
              <th className="w-[10%]">Action</th>
              <th className="w-[10%]">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr colSpan={8}>
                <td>Loading</td>
              </tr>
            ) : (
              gstSalesData.map((item) => (
                <tr key={item.documentId}>
                  <td>{dayjs(item.date).format("DD/MM/YYYY")}</td>
                  <td>{item.bill_no || "-"}</td>

                  <td>{item.gst_customer?.name || "-"}</td>

                  <td>{formattedAmount(item.base_amount)}</td>

                  <td>{item.tax_amount}</td>

                  <td>{item.total_amount}</td>
                  <td>{item.received_bill_nos}</td>
                  <td>{item.received_amount}</td>

                  <td>
                    <div className="flex gap-2">
                      <EditButton
                        onClick={() => {
                          if (item.custom_type) {
                            handleEdit(item);
                          } else {
                            navigate(
                              `${GSTSALESENTRY}?editId=${item.documentId}`,
                            );
                          }
                        }}
                      />

                      <DeletePopup
                        handleDelete={() => handleDelete(item.documentId)}
                      />
                    </div>
                  </td>
                  {role === "superadmin" && (
                    <td>
                      <SelectField
                        value={item.current_status || "status"}
                        options={[
                          { value: "status", label: "Status" },
                          { value: "paid", label: "Paid" },
                          { value: "pending", label: "Pending" },
                          { value: "party", label: "Party" },
                        ]}
                        onChange={(e) =>
                          handleStatusChange(item.documentId, e.target.value)
                        }
                      />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>

          {/* Pagination Footer */}

          <tfoot>
            <tr>
              <td colSpan={9}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 2,
                  }}
                >
                  <FormControl orientation="horizontal" size="sm">
                    <FormLabel>Rows per page:</FormLabel>
                    <Select
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                    >
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                      <Option value={100}>100</Option>
                    </Select>
                  </FormControl>

                  <Typography textAlign="center" sx={{ minWidth: 80 }}>
                    {labelDisplayedRows({
                      from: totalCount === 0 ? 0 : page * rowsPerPage + 1,
                      to: getLabelDisplayedRowsTo(),
                      count: totalCount,
                    })}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="sm"
                      variant="outlined"
                      disabled={page === 0}
                      onClick={() => handleChangePage(page - 1)}
                    >
                      <LeftArrowIcon />
                    </IconButton>

                    <IconButton
                      size="sm"
                      variant="outlined"
                      disabled={getLabelDisplayedRowsTo() >= totalCount}
                      onClick={() => handleChangePage(page + 1)}
                    >
                      <RightIcon />
                    </IconButton>
                  </Box>
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </MainLayout>
  );
};

export default GstSalesList;
