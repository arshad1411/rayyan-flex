import { Fragment, useState } from "react";
import { materialdata } from "../../lib/materialdata";
import Button from "../Button/Button";
import { AddIcon, DeleteIcon } from "../icons";
import InputField from "../InputField/InputField";
import AutocompleteField from "../AutocompleteField/AutocompleteField";

const FormDataInput = ({ formData, setFormData, calculateTotalAmount }) => {
  const [AddErrMsg, setAddErrMsg] = useState("");

  const addNewRow = (type) => {
    setAddErrMsg("");
    const currentRow = formData[formData.length - 1];

    const generateNewRow = (rowType) => {
      if (rowType === "Flex") {
        return {
          type: "Flex",
          width: "",
          height: "",
          material: "",
          sq_ft_price: "",
          piece_count: 1,
          total: 0,
        };
      } else {
        return {
          type: "instruction",
          design_charge: "",
          instruction: "",
          total: 0,
        };
      }
    };

    const validateFlexRow = (row) => {
      return (
        row.width &&
        row.height &&
        row.material &&
        row.sq_ft_price &&
        row.piece_count
      );
    };

    const validateInstructionRow = (row) => {
      return row.instruction && row.design_charge;
    };

    if (!currentRow) {
      const newRow = generateNewRow(type);
      setFormData([...formData, newRow]);
      calculateTotalAmount([...formData, newRow]);
      return;
    }

    if (currentRow.type === "Flex" && !validateFlexRow(currentRow)) {
      setAddErrMsg("Please fill out all the Flex fields.");
      return;
    }

    if (
      currentRow.type === "instruction" &&
      !validateInstructionRow(currentRow)
    ) {
      setAddErrMsg("Please fill out the instruction fields.");
      return;
    }

    const newRow = generateNewRow(type);
    const newFormData = [...formData, newRow];
    setFormData(newFormData);
    calculateTotalAmount(newFormData);
  };

  const removeRow = (index) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
    calculateTotalAmount(newFormData);
  };

  const handleChange = (index, e, name) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    let value;
    if (name) {
      value = e;
    } else {
      ({ name, value } = e.target);
    }

    const newFormData = [...formData];
    newFormData[index][name] = value;

    if (newFormData[index].type === "Flex") {
      const width = Number.parseFloat(newFormData[index].width) || 0;
      const height = Number.parseFloat(newFormData[index].height) || 0;
      const sqFtPrice = Number.parseFloat(newFormData[index].sq_ft_price) || 0;
      const piececount = Number.parseFloat(newFormData[index].piece_count) || 0;

      const totals = width * height * sqFtPrice * piececount || 0;
      const totalRounded = totals.toFixed(2);
      const sizecheck = width * height;

      if (width && height && sqFtPrice) {
        if (
          totalRounded >= 100 &&
          (sizecheck >= 10 || sizecheck * piececount >= 20 || sqFtPrice > 10)
        ) {
          newFormData[index].total = totalRounded;
        } else {
          newFormData[index].total = 100 * piececount;
        }
      } else {
        newFormData[index].total = 0;
      }
    } else if (newFormData[index].type === "instruction") {
      newFormData[index].total = Number.parseFloat(
        newFormData[index].design_charge,
      );
    }

    setFormData(newFormData);
    calculateTotalAmount(newFormData);
  };

  return (
    <div>
      {formData.map((data, index) => (
        <Fragment key={index}>
          {data.type === "Flex" ? (
            <>
              <div className="flex gap-4 my-4">
                <InputField
                  name={"width"}
                  placeholder={"Width"}
                  value={data.width}
                  onChange={(e) => handleChange(index, e)}
                  required={true}
                />
                <InputField
                  name={"height"}
                  placeholder={"Height"}
                  value={data.height}
                  onChange={(e) => handleChange(index, e)}
                  required={true}
                />
                <AutocompleteField
                  label={"Material"}
                  value={data.material}
                  onInputChange={(e, newInputValue) => {
                    if (typeof newInputValue === "string") {
                      handleChange(index, newInputValue, "material");
                    }
                  }}
                  onChange={(e, newInputValue) =>
                    handleChange(index, newInputValue, "material")
                  }
                  options={materialdata.map((data) => data)}
                />
                <InputField
                  name={"sq_ft_price"}
                  placeholder={"Sq.ft Rate"}
                  value={data.sq_ft_price}
                  onChange={(e) => handleChange(index, e)}
                  required={true}
                />
                <InputField
                  name={"piece_count"}
                  placeholder={"Piece Count"}
                  value={data.piece_count}
                  onChange={(e) => handleChange(index, e)}
                  type="number"
                  required={true}
                  dontallowDecimal={true}
                />
                <InputField
                  name={"instruction"}
                  placeholder={"Instruction"}
                  value={data.instruction}
                  onChange={(e) => handleChange(index, e)}
                />

                <Button
                  onClick={() => removeRow(index)}
                  icon1={<DeleteIcon color="#ffffff" />}
                  icon2={<DeleteIcon />}
                  classvalues={"h-[38px] mt-5.5 border-gray-400"}
                />
              </div>
            </>
          ) : (
            <Fragment>
              {data.type === "instruction" && (
                <>
                  <div className="flex gap-4 my-4">
                    <InputField
                      name={"instruction"}
                      placeholder={"Instruction"}
                      value={data.instruction}
                      onChange={(e) => handleChange(index, e)}
                      required={true}
                    />
                    <InputField
                      name={"design_charge"}
                      placeholder={"Amount"}
                      value={data.design_charge}
                      onChange={(e) => handleChange(index, e)}
                      required={true}
                    />
                    <Button
                      onClick={() => removeRow(index)}
                      icon1={<DeleteIcon color="#ffffff" />}
                      icon2={<DeleteIcon />}
                      classvalues={"h-[38px] mt-5.5 border-gray-400"}
                    />
                  </div>
                </>
              )}
            </Fragment>
          )}
        </Fragment>
      ))}

      <div className="flex gap-4 items-center justify-end mt-4">
        <p className="text-red-500 mr-4">{AddErrMsg}</p>
        <Button
          onClick={() => addNewRow("Flex")}
          icon1={<AddIcon color="#ffffff" />}
          icon2={<AddIcon />}
          label="Add Flex"
        />
        {/* <div onClick={() => addNewRow("Flex")}>Addd</div> */}
        <Button
          onClick={() => addNewRow("instruction")}
          icon1={<AddIcon color="#ffffff" />}
          icon2={<AddIcon />}
          label="Add Instruction"
        />
      </div>
    </div>
  );
};

export default FormDataInput;
