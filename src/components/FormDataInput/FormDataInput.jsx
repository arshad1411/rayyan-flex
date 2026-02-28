import { useState } from "react";

import { materialdata } from "../../lib/materialdata";
import AutocompleteField from "../AutocompleteField/AutocompleteField";
import Button from "../Button/Button";
import { AddIcon, DeleteIcon } from "../icons";
import InputField from "../InputField/InputField";

const num = (v) => Number(v) || 0;

/* ---------------- ROW CREATORS ---------------- */

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
  piece_count: 1,
  per_piece_total: 0,
});

const FormDataInput = ({
  flexData = [],
  setFlexData,
  instructionData = [],
  setInstructionData,
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  const [rowsOrder, setRowsOrder] = useState(() => {
    const flexRows = flexData.map((_, i) => ({
      type: "flex",
      index: i,
    }));

    const instructionRows = instructionData.map((_, i) => ({
      type: "instruction",
      index: i,
    }));

    return [...flexRows, ...instructionRows];
  });

  /* ---------------- FLEX ---------------- */

  const addFlexRow = () => {
    setErrorMsg("");

    const lastRow = rowsOrder[rowsOrder.length - 1];

    if (lastRow) {
      if (lastRow.type === "flex") {
        const lastFlex = flexData[lastRow.index];
        if (
          !lastFlex.width ||
          !lastFlex.height ||
          !lastFlex.material ||
          !lastFlex.sq_ft_price
        ) {
          setErrorMsg("Please complete the current flex row first.");
          return;
        }
      }

      if (lastRow.type === "instruction") {
        const lastInstruction = instructionData[lastRow.index];
        if (
          !lastInstruction.instruction ||
          !lastInstruction.per_piece_total ||
          !lastInstruction.piece_count
        ) {
          setErrorMsg("Please complete the current instruction row first.");
          return;
        }
      }
    }

    setFlexData([...flexData, createFlexRow()]);
    setRowsOrder([...rowsOrder, { type: "flex", index: flexData.length }]);
  };

  const removeFlexRow = (index) => {
    const updated = [...flexData];
    updated.splice(index, 1);
    setFlexData(updated);

    setRowsOrder(
      rowsOrder
        .filter((r) => !(r.type === "flex" && r.index === index))
        .map((r) =>
          r.type === "flex" && r.index > index
            ? { ...r, index: r.index - 1 }
            : r,
        ),
    );
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

    const lastRow = rowsOrder[rowsOrder.length - 1];

    if (lastRow) {
      if (lastRow.type === "flex") {
        const lastFlex = flexData[lastRow.index];
        if (
          !lastFlex.width ||
          !lastFlex.height ||
          !lastFlex.material ||
          !lastFlex.sq_ft_price
        ) {
          setErrorMsg("Please complete the current flex row first.");
          return;
        }
      }

      if (lastRow.type === "instruction") {
        const lastInstruction = instructionData[lastRow.index];
        if (
          !lastInstruction.instruction ||
          !lastInstruction.per_piece_total ||
          !lastInstruction.piece_count
        ) {
          setErrorMsg("Please complete the current instruction row first.");
          return;
        }
      }
    }

    setInstructionData([...instructionData, createInstructionRow()]);
    setRowsOrder([
      ...rowsOrder,
      { type: "instruction", index: instructionData.length },
    ]);
  };

  const removeInstructionRow = (index) => {
    const updated = [...instructionData];
    updated.splice(index, 1);
    setInstructionData(updated);

    setRowsOrder(
      rowsOrder
        .filter((r) => !(r.type === "instruction" && r.index === index))
        .map((r) =>
          r.type === "instruction" && r.index > index
            ? { ...r, index: r.index - 1 }
            : r,
        ),
    );
  };

  const updateInstruction = (index, name, value) => {
    const updated = [...instructionData];
    updated[index][name] = value;

    setInstructionData(updated);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div>
      {rowsOrder.map((row, orderIndex) => {
        /* ---------- FLEX ---------- */
        if (row.type === "flex") {
          const data = flexData[row.index];
          if (!data) return null;

          return (
            <div key={`flex-${orderIndex}`} className="flex gap-4 my-4">
              <InputField
                placeholder="Width"
                value={data.width}
                onChange={(e) => updateFlex(row.index, "width", e.target.value)}
                required
              />

              <InputField
                placeholder="Height"
                value={data.height}
                onChange={(e) =>
                  updateFlex(row.index, "height", e.target.value)
                }
                required
              />

              <AutocompleteField
                label="Material"
                value={data.material}
                options={materialdata}
                onChange={(e, value) =>
                  updateFlex(row.index, "material", value)
                }
                onInputChange={(e, value) =>
                  updateFlex(row.index, "material", value)
                }
              />

              <InputField
                placeholder="Sq.ft Rate"
                value={data.sq_ft_price}
                onChange={(e) =>
                  updateFlex(row.index, "sq_ft_price", e.target.value)
                }
                required
              />

              <InputField
                placeholder="Piece Count"
                type="number"
                dontallowDecimal
                value={data.piece_count}
                onChange={(e) =>
                  updateFlex(row.index, "piece_count", e.target.value)
                }
              />

              <InputField
                placeholder="Instruction"
                value={data.instruction}
                onChange={(e) =>
                  updateFlex(row.index, "instruction", e.target.value)
                }
              />

              <Button
                onClick={() => removeFlexRow(row.index)}
                icon1={<DeleteIcon color="#fff" />}
                icon2={<DeleteIcon />}
                className="h-[38px] mt-5.5 border-gray-400"
              />
            </div>
          );
        }

        /* ---------- INSTRUCTION ---------- */
        if (row.type === "instruction") {
          const data = instructionData[row.index];
          if (!data) return null;

          return (
            <div key={`instruction-${orderIndex}`} className="flex gap-4 my-4">
              <InputField
                placeholder="Instruction"
                value={data.instruction}
                onChange={(e) =>
                  updateInstruction(row.index, "instruction", e.target.value)
                }
                required
              />

              <InputField
                placeholder="Piece Count"
                type="number"
                dontallowDecimal
                value={data.piece_count}
                onChange={(e) =>
                  updateInstruction(row.index, "piece_count", e.target.value)
                }
              />

              <InputField
                placeholder="Amount"
                value={data.per_piece_total}
                onChange={(e) =>
                  updateInstruction(
                    row.index,
                    "per_piece_total",
                    e.target.value,
                  )
                }
                required
              />

              <Button
                onClick={() => removeInstructionRow(row.index)}
                icon1={<DeleteIcon color="#fff" />}
                icon2={<DeleteIcon />}
                className="h-[38px] mt-5.5 border-gray-400"
              />
            </div>
          );
        }

        return null;
      })}

      {/* ACTION BUTTONS */}
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
