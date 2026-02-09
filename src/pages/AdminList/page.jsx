import { toast } from "react-toastify";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { DateUiPicker } from "../../components/Datepicker/Datepicker";
import { SaveIcon } from "../../components/icons";
import { useSearchParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import SelectField from "../../components/SelectField/SelectField";
import dayjs from "dayjs";
import MainLayout from "../../layouts/MainLayout";
const AdminEntry = () => {
  const [SearchParams] = useSearchParams();

  const [changeDate, setchangeDate] = useState(null);
  const [Instruction, setInstruction] = useState("");
  const [RoleSelect, setRoleSelect] = useState("");
  const [RecvMethod, setRecvMethod] = useState("cash");
  const [customType, setcustomType] = useState("Expense");
  const [expenceAmount, setExpenceAmount] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      instruction: "",
      amadmin_amountunt: "",
    };

    if (!Instruction.trim()) {
      newErrors.instruction = "Instruction is required";
      isValid = false;
    }

    if (!expenceAmount) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (isNaN(Number(expenceAmount)) || Number(expenceAmount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
      isValid = false;
    }

    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-medium">Admin Entry</h1>

      <form onSubmit={handleSubmit} id="adminEntryForm">
        <div className="grid grid-cols-6 gap-4 mt-8">
          <div className="flex flex-col" style={{ lineHeight: "10px" }}>
            <label className="text-base">Date</label>
            <div className="relative">
              <DateUiPicker
                onChange={(newValue) => {
                  setchangeDate(dayjs(newValue).format("YYYY-MM-DD"));
                }}
                label="Date"
                value={changeDate}
                className={"w-full"}
              />
            </div>
          </div>
          <div>
            <Input
              name={"instruction"}
              placeholder={"Instruction"}
              value={Instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </div>
          <div>
            <SelectField
              selectName={"createdrole"}
              options={[
                { value: "superadmin", label: "Super Admin" },
                { value: "Public", label: "Public" },
              ]}
              value={RoleSelect}
              onChange={(e) => setRoleSelect(e.target.value)}
              placeholder={"Created Role"}
              required={true}
            />
          </div>
          <div>
            <SelectField
              selectName={"customtype"}
              options={[
                { value: "Expense", label: "Expense" },
                { value: "Receive", label: "Receive" },
                { value: "Gst Expense", label: "Gst Expense" },
                { value: "Gst Receive", label: "Gst Receive" },
              ]}
              value={customType}
              onChange={(e) => setcustomType(e.target.value)}
              placeholder={"Custom Type"}
              required={true}
            />
          </div>
          <div>
            <SelectField
              selectName={"recivemethod"}
              options={[
                { value: "cash", label: "Cash" },
                { value: "gpay", label: "Gpay" },
                { value: "account", label: "Account" },
              ]}
              value={RecvMethod}
              onChange={(e) => setRecvMethod(e.target.value)}
              placeholder={"Method"}
              required={true}
            />
          </div>
          <div>
            <Input
              name={"admin_amount"}
              placeholder={"Amount"}
              value={expenceAmount}
              onChange={(e) => setExpenceAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type={"submit"}
            form={"adminEntryForm"}
            label={"Save"}
            icon1={<SaveIcon color="#fff" />}
            icon2={<SaveIcon color="#fff" />}
            classvalues={
              "bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-lg border-0 mt-2"
            }
          />
        </div>
      </form>
    </MainLayout>
  );
};

export default AdminEntry;
