import { Checkbox, Table } from "@mui/joy";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { getCustomers } from "../../api/customer";
import {
  deleteLocalList,
  getLocalList,
  updateLocalList,
} from "../../api/localList";
import { createLocalPaid } from "../../api/localPaid";
import { createLocalParty } from "../../api/localParty";
import { createLocalPending } from "../../api/localPending";
import AutocompleteField from "../../components/AutocompleteField/AutocompleteField";
import Button from "../../components/Button/Button";
import Datepicker from "../../components/Datepicker/Datepicker";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import EditButton from "../../components/EditButton/EditButton";
import SelectField from "../../components/SelectField/SelectField";
import { useAuth } from "../../context/auth-context";
import MainLayout from "../../layouts/MainLayout";
import { LOCALENTRY } from "../../router/paths";
import dayjs from "../../utils/dayjs";
import { formattedAmount } from "../../utils/FormatAmount";
import { transformBillingData } from "../../utils/transformBillingData";

const LocalList = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchCustomer, setSearchCustomer] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [approveDate, setApproveDate] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  /* ================= LOAD LOCAL LIST ================= */
  const loadLocalEntriesData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLocalList("sort[0]=date:desc");
      setLocalData(res || []);
    } catch (error) {
      console.error("Local list fetch failed:", error);
      setLocalData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    loadCustomers();
    loadLocalEntriesData();
  }, [loadCustomers, loadLocalEntriesData]);

  /* ================= FILTER + GROUP ================= */

  const groupedData = useMemo(() => {
    if (!localData?.length) return {};

    const isWithinDateRange = (date) => {
      if (!fromDate || !toDate) return true;
      const d = dayjs(date);
      return d.isBetween(dayjs(fromDate), dayjs(toDate), "day", "[]");
    };

    const filtered = localData.filter((item) => {
      const customerMatch =
        !searchCustomer || item.customer.documentId === searchCustomer.value;

      const dateMatch =
        isWithinDateRange(item.date) ||
        item.cash?.some((c) => isWithinDateRange(c.date)) ||
        item.gpay?.some((g) => isWithinDateRange(g.date));

      return customerMatch && dateMatch;
    });

    const grouped = filtered.reduce((acc, item) => {
      const key = dayjs(item.date).format("YYYY-MM-DD");

      if (!acc[key]) acc[key] = [];

      const sizeData = item.size_data || [];

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

      acc[key].push({
        ...item,
        particulars,
      });

      return acc;
    }, {});

    return grouped;
  }, [localData, searchCustomer, fromDate, toDate]);

  /* ================= DELETE ================= */

  const handleDelete = async (deleteId) => {
    try {
      await deleteLocalList(deleteId);
      toast.success("You have successfully deleted Local Sales");
      await loadLocalEntriesData();
    } catch (error) {
      console.error("Error deleting local Sales:", error);
    }
  };

  /* ================= STATUS CHANGE ================= */
  const handleStatusChange = async (id, value) => {
    try {
      await updateLocalList(id, { current_state: value });

      await loadLocalEntriesData();
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  /* ================= APPROVAL ================= */
  const handleApproveClick = (date) => {
    const group = groupedData[date];

    const invalid = group.some(
      (item) => !item.current_state || item.current_state === "status",
    );

    if (invalid) {
      toast.error("All status must be selected before approval.");
      return;
    }

    setApproveDate(date);
    setConfirmOpen(true);
  };

  const handleApproveConfirm = async () => {
    const group = groupedData[approveDate].map((item) => ({
      documentId: item.documentId,
      payload: transformBillingData(item),
    }));

    console.log(group);

    setLoading(true);

    try {
      for (const { documentId, payload } of group) {
        if (payload.current_state === "paid") await createLocalPaid(payload);
        if (payload.current_state === "pending")
          await createLocalPending(payload);
        if (payload.current_state === "party") await createLocalParty(payload);

        await deleteLocalList(documentId);
      }

      await loadLocalEntriesData();
      toast.success("Local list approved successfully!");
      setConfirmOpen(false);
    } catch (error) {
      console.error("Approval failed:", error);
      toast.error("Failed to approve local list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const balanceTotal = groupedData[approveDate]?.reduce(
    (total, item) => total + item.balance_amount,
    0,
  );

  /* ================= RENDER ================= */
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">Local List</h1>

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
            onChange={(e, val) => setSearchCustomer(val)}
          />
        </div>
      </div>

      {/* Tables */}
      {Object.keys(groupedData).map((date) => (
        <div key={date} className="mt-8">
          <h2 className="text-lg font-semibold mb-2">
            Date: {dayjs(date).format("DD/MM/YYYY")}
          </h2>

          <Table borderAxis="both" hoverRow>
            <thead>
              <tr>
                <th className="w-[10%]">Customer</th>
                <th className="w-[11%]">Phone</th>
                <th className="w-[30%]">Particulars</th>
                <th className="w-[7%]">Total</th>
                <th className="w-[14%]">Cash</th>
                <th className="w-[16%]">GPay</th>
                <th className="w-[7%]">Balance</th>
                <th className="w-[10%]">Action</th>
                {role === "superadmin" && <th className="w-[10%]">Status</th>}
              </tr>
            </thead>
            <tbody>
              {groupedData[date].map((item) => (
                <tr key={item.documentId}>
                  <td>{item.customer?.name || "-"}</td>
                  <td>{item.customer?.phonenumber || "-"}</td>
                  <td>
                    {item.particulars.map((p, index) => (
                      <div key={index}>{p.text}</div>
                    ))}
                  </td>

                  <td>{formattedAmount(item.total_amount)}</td>
                  <td>
                    {item.cash?.length === 0
                      ? "-"
                      : item.cash?.map((c) => (
                          <div key={c.id}>
                            {dayjs(c.date).format("DD/MM/YY")} -{" "}
                            {formattedAmount(c.amount)}
                          </div>
                        ))}
                  </td>
                  <td>
                    {item.gpay?.length === 0
                      ? "-"
                      : item.gpay?.map((g) => (
                          <div key={g.id} className="flex gap-1">
                            <Checkbox />
                            {dayjs(g.date).format("DD/MM/YY")} -{" "}
                            {formattedAmount(g.amount)}
                          </div>
                        ))}
                  </td>
                  <td className={item.balance_amount > 0 ? "text-red-500" : ""}>
                    {formattedAmount(item.balance_amount)}
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <EditButton
                        onClick={() =>
                          navigate(`${LOCALENTRY}?editId=${item.documentId}`)
                        }
                      />
                      <DeletePopup
                        handleDelete={() => handleDelete(item.documentId)}
                      />
                    </div>
                  </td>
                  {role === "superadmin" && (
                    <td>
                      <SelectField
                        value={item.current_state || "status"}
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
              ))}
            </tbody>
          </Table>

          {role === "superadmin" && (
            <div className="flex justify-end mt-4">
              <Button
                label="Approve"
                onClick={() => handleApproveClick(date)}
                disabled={loading}
              />
            </div>
          )}
        </div>
      ))}

      {/* Confirm Popup */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Confirm Approval</h3>
            <p>Are you sure you want to approve this group?</p>
            <p
              className={`mt-3 ${balanceTotal > 0 ? "text-red-500 font-semibold" : ""}`}
            >
              Balance amount: {formattedAmount(balanceTotal)}
            </p>

            <div className="flex gap-3 mt-4">
              <Button
                label="Confirm"
                onClick={handleApproveConfirm}
                className="w-full hover:bg-green-600 border-green-600 text-green-600"
              />
              <Button
                label="Cancel"
                onClick={() => setConfirmOpen(false)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default LocalList;
