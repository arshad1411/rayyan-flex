import { Table } from "@mui/joy";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../api/customer";
import { getLocalEntries } from "../../api/localEntry";
import AutocompleteField from "../../components/AutocompleteField/AutocompleteField";
import Button from "../../components/Button/Button";
import Datepicker from "../../components/Datepicker/Datepicker";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import EditButton from "../../components/EditButton/EditButton";
import { ApproveIcon, ClearIcon, WarningIcon } from "../../components/icons";
import SelectField from "../../components/SelectField/SelectField";
import { useAuth } from "../../context/auth-context";
import MainLayout from "../../layouts/MainLayout";
import { LOCALENTRY } from "../../router/paths";

const LocalList = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [localData, setLocalData] = useState([]);

  const loadCustomers = useCallback(async () => {
    try {
      const data = await getCustomers();
      setCustomerList(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomerList([]);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await loadCustomers();
    };

    fetchData();
  }, [loadCustomers]);

  const loadLocalList = useCallback(async () => {
    try {
      const data = await getLocalEntries(
        "filters[current_state][$eq]=status&sort[0]=date:desc",
      );
      console.log(data);
      setLocalData(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLocalData([]);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await loadLocalList();
    };

    fetchData();
  }, [loadLocalList]);

  return (
    <MainLayout>
      <h1 className="text-2xl font-medium  mb-4">Local List</h1>
      <div className="flex gap-4 items-center justify-start mt-2">
        <Datepicker
          type="multipledatepicker"
          FromDate={fromDate}
          ToDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </div>

      <div className="flex justify-end">
        <AutocompleteField
          label="Customer Name"
          value={searchCustomer}
          options={customerList.map((data) => ({
            label: data.name,
            value: data.documentId,
          }))}
          getOptionLabel={(option) => option.label || ""}
          onChange={(e, value) => setSearchCustomer(value)}
        />
      </div>
      <div className="mt-8">
        <div className="my-6 flex justify-between items-center">
          <p className="text-base mt-4">Date: 23/03/2001</p>

          <div className="flex items-center gap-4">
            <p>Total Cash Amount : 3,000</p>
            <p>Total Gpay Amount :20,000</p>
          </div>
        </div>
        <div className="mt-4">
          <Table
            borderAxis={"both"}
            hoverRow
            sx={{
              width: "100%",
              tbody: {
                tr: {
                  "&:hover": {
                    background: "#e9e9e980",
                  },
                },
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Customer Name</th>
                <th style={{ width: "7%" }}>Ph.no</th>
                <th style={{ width: "7%" }}>Note</th>
                <th style={{ width: "11%" }}>Particular</th>
                <th style={{ width: "6%" }}>Total Amnt</th>
                <th style={{ width: "12%" }}>Cash Amt</th>
                <th style={{ width: "12%" }}>Gpay Amnt</th>
                <th style={{ width: "6%" }}>Balance </th>
                <th style={{ width: "10%" }}>Action </th>
                {role === "superadmin" && (
                  <th style={{ width: "10%" }}>Status </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>1234567890</td>
                <td>Sample Note</td>
                <td>
                  <p>10 x 8 normal - 1pc - 2000</p>
                  <p>design charge - 1pc - 2000</p>
                  <p>design charge - 1pc - 2000</p>
                </td>
                <td>20,000</td>
                <td>
                  <p>03/02/26 - 1,000</p>
                  <p>08/03/26 - 2,000</p>
                </td>
                <td>
                  <p>05/02/26 - 4,000</p>
                  <p>09/03/26 - 5,000</p>
                </td>
                <td>20,000</td>
                <td>
                  <div className="flex gap-1">
                    <EditButton
                      onClick={() =>
                        navigate(`${LOCALENTRY}?editId=${"515146646"}`)
                      }
                    />
                    <DeletePopup
                      onClick={() => {
                        setDeleteId("515146646");
                      }}
                      // handleDelete={handleDelete}+
                    />
                  </div>
                </td>
                {role === "superadmin" && (
                  <td>
                    <SelectField
                      selectName={"status"}
                      options={[
                        { value: "status", label: "Status" },
                        { value: "paid", label: "paid" },
                        { value: "pending", label: "pending" },
                        { value: "party", label: "party" },
                      ]}
                      // value={data.attributes.status || "status"}
                      // onChange={(e) => statusUpdate(data.id, e.target.value)}
                    />
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
        </div>
        {role === "superadmin" && (
          <div className="flex justify-end my-4">
            <Button
              label={"Approve"}
              icon1={<ApproveIcon color="#ffffff" />}
              icon2={<ApproveIcon color="#ffffff" />}
              // onClick={() => handleApproveClick(date)}
              className={
                "bg-[#9e77d2] text-[#ffffff] disabled:hidden disabled:cursor-not-allowed"
              }
              disabled={"23/03/2001" === dayjs(new Date()).format("YYYY-MM-DD")}
            />
          </div>
        )}
      </div>

      {popupOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-[999]"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-medium flex items-center gap-2">
                <WarningIcon /> Confirmation
              </h1>
              <ClearIcon
                onClick={() => setPopupOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="my-4">
              <p>Are you sure you want to Approve this?</p>
              <span style={{ fontWeight: "700" }}>
                Balance Amount :{" "}
                {/* <span className={`${fullBalance > 0 && "text-red-500"}`}>
                  {fullBalance}
                </span> */}
              </span>
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              <Button
                label="Approve"
                className="w-full hover:bg-green-600 border-green-600 text-green-600"
                onClick={() => {
                  // handleApprove(approveData);
                  setPopupOpen(false);
                }}
              />
              <Button
                label="Cancel"
                onClick={() => setPopupOpen(false)}
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
