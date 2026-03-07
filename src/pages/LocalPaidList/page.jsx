import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Table,
  Typography,
} from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { getCustomers } from "../../api/customer";
import { deleteLocalPaid, getLocalPaid } from "../../api/localPaid";

import AutocompleteField from "../../components/AutocompleteField/AutocompleteField";
import Datepicker from "../../components/Datepicker/Datepicker";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import EditButton from "../../components/EditButton/EditButton";

import MainLayout from "../../layouts/MainLayout";

import { LOCALENTRY } from "../../router/paths";
import dayjs from "../../utils/dayjs";
import { formattedAmount } from "../../utils/FormatAmount";

import LeftArrowIcon from "../../components/icons/LeftArrowIcon";
import RightIcon from "../../components/icons/RightIcon";
import PreLoader from "../../components/Preloader/Preloader";

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count}`;
}

const LocalPaidList = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchCustomer, setSearchCustomer] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [localData, setLocalData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalCount, setTotalCount] = useState(0);

  /* ================= LOAD CUSTOMERS ================= */

  const loadCustomers = useCallback(async () => {
    try {
      const res = await getCustomers();
      setCustomers(res || []);
    } catch (error) {
      console.error("Customer fetch failed:", error);
      setCustomers([]);
    }
  }, []);

  /* ================= API QUERY BUILDER ================= */

  const buildQuery = () => {
    const query = [];

    query.push(`pagination[page]=${page + 1}`);
    query.push(`pagination[pageSize]=${rowsPerPage}`);
    query.push(`sort[0]=date:desc`);

    if (searchCustomer?.value) {
      query.push(`filters[customer][documentId][$eq]=${searchCustomer.value}`);
    }

    if (fromDate && toDate) {
      query.push(`filters[date][$gte]=${dayjs(fromDate).format("YYYY-MM-DD")}`);
      query.push(`filters[date][$lte]=${dayjs(toDate).format("YYYY-MM-DD")}`);
    }

    return query.join("&");
  };

  /* ================= LOAD DATA ================= */

  const loadLocalPaidData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getLocalPaid(buildQuery());

      setLocalData(res?.data || []);
      setTotalCount(res?.meta?.pagination?.total || 0);
    } catch (error) {
      console.error("Local paid fetch failed:", error);
      toast.error("Failed to load local paid list");
      setLocalData([]);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchCustomer, fromDate, toDate]);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  useEffect(() => {
    loadLocalPaidData();
  }, [loadLocalPaidData]);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await deleteLocalPaid(id);
      toast.success("Deleted successfully");
      loadLocalPaidData();
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

  /* ================= RENDER ================= */
  if (loading) {
    return <PreLoader />;
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">Local Paid List</h1>

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
            options={customers.map((c) => ({
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

      {/* Table */}

      <div className="mt-8">
        <Table borderAxis="both" hoverRow>
          <thead>
            <tr>
              <th className="w-[10%]">Date</th>
              <th className="w-[10%]">Customer</th>
              <th className="w-[11%]">Phone</th>
              <th className="w-[30%]">Particulars</th>
              <th className="w-[7%]">Total</th>
              <th className="w-[14%]">Cash</th>
              <th className="w-[16%]">GPay</th>
              <th className="w-[10%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {localData.map((item) => (
              <tr key={item.documentId}>
                <td>{dayjs(item.date).format("DD/MM/YYYY")}</td>

                <td>{item.customer?.name || "-"}</td>

                <td>{item.customer?.phonenumber || "-"}</td>

                <td>
                  {item.particulars?.map((p) => (
                    <div key={p.id}>{p.text}</div>
                  ))}
                </td>

                <td>{formattedAmount(item.total_amount)}</td>

                <td>
                  {item.cash?.length === 0
                    ? "-"
                    : item.cash.map((c) => (
                        <div key={c.id}>
                          {dayjs(c.date).format("DD/MM/YY")} -{" "}
                          {formattedAmount(c.amount)}
                        </div>
                      ))}
                </td>

                <td>
                  {item.gpay?.length === 0
                    ? "-"
                    : item.gpay.map((g) => (
                        <div key={g.id}>
                          {dayjs(g.date).format("DD/MM/YY")} -{" "}
                          {formattedAmount(g.amount)}
                        </div>
                      ))}
                </td>

                <td>
                  <div className="flex gap-2">
                    <EditButton
                      onClick={() =>
                        navigate(
                          `${LOCALENTRY}?editId=${item.documentId}&screenFrom=paid`,
                        )
                      }
                    />

                    <DeletePopup
                      handleDelete={() => handleDelete(item.documentId)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Pagination Footer */}

          <tfoot>
            <tr>
              <td colSpan={8}>
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

export default LocalPaidList;
