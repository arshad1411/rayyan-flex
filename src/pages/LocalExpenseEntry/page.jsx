import { Table } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createLocalExpense,
  deleteLocalExpense,
  getLocalExpense,
  updateLocalExpense,
} from "../../api/localExpense";
import Button from "../../components/Button/Button";
import { DateUiPicker } from "../../components/Datepicker/Datepicker";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import EditButton from "../../components/EditButton/EditButton";
import { SaveIcon } from "../../components/icons";
import InputField from "../../components/InputField/InputField";
import PreLoader from "../../components/Preloader/Preloader";
import SelectField from "../../components/SelectField/SelectField";
import { useAuth } from "../../context/auth-context";
import MainLayout from "../../layouts/MainLayout";
import { setCurrentTime } from "../../utils/DatewithTime";

const LocalExpenseEntry = () => {
  const { role } = useAuth();
  const [date, setDate] = useState(new Date());
  const [instruction, setInstruction] = useState("");
  const [customType, setCustomType] = useState("cash");
  const [method, setMethod] = useState("expense");
  const [amount, setAmount] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState("");

  const loadExpenseData = useCallback(async () => {
    setLoading(true);
    const query = [];
    query.push(`sort[0]=date:desc`);
    query.push(`filters[approved][$eq]=false`);

    const queryString = query.join("&");

    try {
      const res = await getLocalExpense(queryString);

      setExpenseData(res?.data || []);
    } catch (error) {
      console.error("Local expense fetch failed:", error);
      toast.error("Failed to load local expense list");
      setExpenseData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenseData();
  }, [loadExpenseData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date,
      instruction,
      method,
      custom_type: customType,
      amount: parseInt(amount),
    };

    try {
      if (editId) {
        await updateLocalExpense(editId, payload);
        toast.success("Local expense updated successfully");
      } else {
        await createLocalExpense(payload);
        toast.success("Local expense created successfully");
      }
    } catch (error) {
      console.error("Local expense save failed:", error);
      toast.error("Failed to save local expense");
    }
    loadExpenseData();
    setEditId("");
    setDate(new Date());
    setInstruction("");
    setMethod("expense");
    setCustomType("cash");
    setAmount(0);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLocalExpense(id);
      toast.success("Deleted successfully");
      loadExpenseData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.documentId);
    setDate(new Date(item.date));
    setInstruction(item.instruction);
    setMethod(item.method);
    setCustomType(item.custom_type);
    setAmount(item.amount);
  };

  if (loading) {
    <PreLoader />;
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-medium  mb-4">Local Expense Entry</h1>{" "}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-6 gap-4 ">
          <DateUiPicker
            value={date}
            label="Date"
            onChange={(d) => setDate(setCurrentTime(d))}
            className={"w-full"}
            minDate={role === "superadmin" ? false : new Date()}
          />

          <InputField
            placeholder="Instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />

          <SelectField
            label={"Method"}
            selectName={"method"}
            options={[
              { value: "expense", label: "Expense" },
              { value: "receive", label: "Receive" },
            ]}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder={"Method"}
            required={true}
          />

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
            value={amount}
            onChange={(e) => setAmount(e.target.value) || 0}
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
      <div className="mt-8">
        <Table borderAxis="both" hoverRow>
          <thead>
            <tr>
              <th className="w-[30%]">Instruction</th>
              <th className="w-[20%]">Method</th>
              <th className="w-[15%]">Custom Type</th>
              <th className="w-[17%]">Amount</th>
              <th className="w-[18%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {expenseData.map((item) => (
              <tr key={item.documentId}>
                <td>{item.instruction}</td>
                <td>{item.method}</td>
                <td>{item.custom_type}</td>
                <td>{item.amount}</td>
                <td>
                  <div className="flex gap-2">
                    <EditButton onClick={() => handleEdit(item)} />

                    <DeletePopup
                      handleDelete={() => handleDelete(item.documentId)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default LocalExpenseEntry;
