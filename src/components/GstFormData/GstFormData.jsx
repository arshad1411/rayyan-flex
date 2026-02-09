import { Fragment, useState } from "react";
import Button from "../Button/Button";
import { AddIcon, DeleteIcon } from "../icons";
import InputField from "../InputField/InputField";

const GstFormData = ({ formData, setFormData, calculateTotalAmount }) => {
  const [AddErrMsg, setAddErrMsg] = useState("");

  const addNewRow = (type) => {
    setAddErrMsg("");
    const currentRow = formData[formData.length - 1];

    const generateNewRow = (rowType) => {
      if (rowType === "Flex") {
        return {
          type: "Flex",
          instruction: "",
          width: "",
          height: "",
          sqftrate: "",
          quantity: 1,
          per_piece_amnt: "",
          piece_total_amount: 0,
        };
      } else {
        return {
          type: "Party",
          instruction: "",
          quantity: 1,
          per_piece_amnt: "",
          piece_total_amount: 0,
        };
      }
    };

    const validateFlexRow = (row) => {
      return (
        row.instruction &&
        row.width &&
        row.height &&
        row.sqftrate &&
        row.quantity > 0
      );
    };

    const validateInstructionRow = (row) => {
      return row.instruction && row.quantity > 0;
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

    if (currentRow.type === "Party" && !validateInstructionRow(currentRow)) {
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
      const width = parseFloat(newFormData[index].width) || 0;
      const height = parseFloat(newFormData[index].height) || 0;
      const sqFtPrice = parseFloat(newFormData[index].sqftrate) || 0;
      const quantity = newFormData[index].quantity || 0;

      const perPieceAmount = width * height * sqFtPrice || 0;
      const total = perPieceAmount * quantity;
      const sizecheck = width * height;

      console.log(sizecheck * quantity);
      if (
        total >= 100 &&
        (sizecheck >= 10 || sizecheck * quantity >= 20 || sqFtPrice > 10)
      ) {
        newFormData[index].per_piece_amnt =
          parseFloat(perPieceAmount).toFixed(2);
      } else {
        newFormData[index].per_piece_amnt = Math.max(
          perPieceAmount,
          100,
        ).toFixed(2);
      }

      if (sizecheck >= 10 || sizecheck * quantity >= 20 || sqFtPrice > 10) {
        newFormData[index].piece_total_amount = Math.max(total, 100).toFixed(2);
      } else {
        newFormData[index].piece_total_amount = Math.max(
          100 * quantity,
          100,
        ).toFixed(2);
      }
    } else if (newFormData[index].type === "Party") {
      const perPieceAmount = parseFloat(newFormData[index].per_piece_amnt) || 0;

      const quantity = newFormData[index].quantity || 0;
      const total = perPieceAmount * quantity;

      newFormData[index].piece_total_amount = parseFloat(total).toFixed(2);
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
                  name={"instruction"}
                  placeholder={"Instruction"}
                  value={data.instruction}
                  onChange={(e) => handleChange(index, e)}
                />
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

                <InputField
                  name={"sqftrate"}
                  placeholder={"Sq.ft Rate"}
                  value={data.sqftrate}
                  onChange={(e) => handleChange(index, e)}
                  required={true}
                />
                <InputField
                  name={"quantity"}
                  placeholder={"Quantity"}
                  value={data.quantity}
                  onChange={(e) => handleChange(index, e)}
                />
                <InputField
                  name={"per_piece_amnt"}
                  placeholder={"Per Piece Amt"}
                  value={data.per_piece_amnt}
                  onChange={(e) => handleChange(index, e)}
                />
                <InputField
                  name={"piece_total_amount"}
                  placeholder={"Total"}
                  value={data.piece_total_amount}
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
              {data.type === "Party" && (
                <>
                  <div className="flex gap-4 my-4">
                    <InputField
                      name={"instruction"}
                      placeholder={"Instruction/Material"}
                      value={data.instruction}
                      onChange={(e) => handleChange(index, e)}
                      required={true}
                    />
                    <InputField
                      name={"quantity"}
                      placeholder={"Quantity"}
                      value={data.quantity}
                      onChange={(e) => handleChange(index, e)}
                      required={true}
                    />
                    <InputField
                      name={"per_piece_amnt"}
                      placeholder={"One Piece Amt"}
                      value={data.per_piece_amnt}
                      onChange={(e) => handleChange(index, e)}
                      required={true}
                    />
                    <InputField
                      name={"piece_total_amount"}
                      placeholder={"Total"}
                      value={data.piece_total_amount}
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
          onClick={() => addNewRow("Party")}
          icon1={<AddIcon color="#ffffff" />}
          icon2={<AddIcon />}
          label="Add Instruction"
        />
      </div>
    </div>
  );
};

export default GstFormData;
