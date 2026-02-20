import { useState } from "react";

import { materialdata } from "../../lib/materialdata";
import AutocompleteField from "../AutocompleteField/AutocompleteField";
import Button from "../Button/Button";
import { AddIcon, DeleteIcon } from "../icons";
import InputField from "../InputField/InputField";

const num = (v) => Number(v) || 0;

const createFlexRow = () => ({
  width: "",
  height: "",
  material: "",
  sq_ft_price: "",
  piece_count: 1,
  instruction: "",
  per_piece_total: 0,
});

const createInstructionRow = () => ({
  instruction: "",
  design_charge: "",
  per_piece_total: 0,
});

const FormDataInput = ({
  flexData = [],
  setFlexData,
  instructionData = [],
  setInstructionData,
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  /* ---------------- FLEX ---------------- */

  const addFlexRow = () => {
    setErrorMsg("");

    const last = flexData[flexData.length - 1];

    if (
      last &&
      (!last.width || !last.height || !last.material || !last.sq_ft_price)
    ) {
      setErrorMsg("Please complete the current flex row first.");
      return;
    }

    setFlexData([...flexData, createFlexRow()]);
  };

  const removeFlexRow = (index) => {
    const updated = [...flexData];
    updated.splice(index, 1);
    setFlexData(updated);
  };

  const updateFlex = (index, name, value) => {
    const updated = [...flexData];
    updated[index][name] = value;

    const row = updated[index];

    const width = num(row.width);
    const height = num(row.height);
    const rate = num(row.sq_ft_price);
    const pieces = num(row.piece_count);

    const area = width * height;
    const calculated = area * rate * pieces;

    if (width && height && rate) {
      if (
        calculated >= 100 &&
        (area >= 10 || area * pieces >= 20 || rate > 10)
      ) {
        row.per_piece_total = Number(calculated.toFixed(2));
      } else {
        row.per_piece_total = 100 * pieces;
      }
    } else {
      row.per_piece_total = 0;
    }

    setFlexData(updated);
  };

  /* ---------------- INSTRUCTION ---------------- */

  const addInstructionRow = () => {
    setErrorMsg("");

    const last = instructionData[instructionData.length - 1];

    if (last && (!last.instruction || !last.design_charge)) {
      setErrorMsg("Please complete the current instruction row first.");
      return;
    }

    setInstructionData([...instructionData, createInstructionRow()]);
  };

  const removeInstructionRow = (index) => {
    const updated = [...instructionData];
    updated.splice(index, 1);
    setInstructionData(updated);
  };

  const updateInstruction = (index, name, value) => {
    const updated = [...instructionData];
    updated[index][name] = value;

    updated[index].per_piece_total = num(updated[index].design_charge);

    setInstructionData(updated);
  };

  return (
    <div>
      {flexData.map((row, index) => (
        <div key={index} className="flex gap-4 my-4">
          <InputField
            name="width"
            placeholder="Width"
            value={row.width}
            onChange={(e) => updateFlex(index, "width", e.target.value)}
            required
          />

          <InputField
            name="height"
            placeholder="Height"
            value={row.height}
            onChange={(e) => updateFlex(index, "height", e.target.value)}
            required
          />

          <AutocompleteField
            label="Material"
            value={row.material}
            options={materialdata}
            onChange={(e, value) => updateFlex(index, "material", value)}
            onInputChange={(e, value) => updateFlex(index, "material", value)}
          />

          <InputField
            name="sq_ft_price"
            placeholder="Sq.ft Rate"
            value={row.sq_ft_price}
            onChange={(e) => updateFlex(index, "sq_ft_price", e.target.value)}
            required
          />

          <InputField
            name="piece_count"
            placeholder="Piece Count"
            value={row.piece_count}
            type="number"
            dontallowDecimal
            onChange={(e) => updateFlex(index, "piece_count", e.target.value)}
          />

          <InputField
            name="instruction"
            placeholder="Instruction"
            value={row.instruction}
            onChange={(e) => updateFlex(index, "instruction", e.target.value)}
          />

          <Button
            onClick={() => removeFlexRow(index)}
            icon1={<DeleteIcon color="#fff" />}
            icon2={<DeleteIcon />}
            className="h-[38px] mt-5.5 border-gray-400"
          />
        </div>
      ))}

      {/* INSTRUCTION */}
      {instructionData.map((row, index) => (
        <div key={index} className="flex gap-4 my-4">
          <InputField
            name="instruction"
            placeholder="Instruction"
            value={row.instruction}
            onChange={(e) =>
              updateInstruction(index, "instruction", e.target.value)
            }
            required
          />

          <InputField
            name="design_charge"
            placeholder="Amount"
            value={row.design_charge}
            onChange={(e) =>
              updateInstruction(index, "design_charge", e.target.value)
            }
            required
          />

          <Button
            onClick={() => removeInstructionRow(index)}
            icon1={<DeleteIcon color="#fff" />}
            icon2={<DeleteIcon />}
            className="h-[38px] mt-5.5 border-gray-400"
          />
        </div>
      ))}

      {/* ACTIONS */}
      <div className="flex gap-4 items-center justify-end mt-4">
        <p className="text-red-500 mr-4">{errorMsg}</p>

        <Button
          onClick={addFlexRow}
          icon1={<AddIcon color="#fff" />}
          icon2={<AddIcon />}
          label="Add Flex"
        />

        <Button
          onClick={addInstructionRow}
          icon1={<AddIcon color="#fff" />}
          icon2={<AddIcon />}
          label="Add Instruction"
        />
      </div>
    </div>
  );
};

export default FormDataInput;
