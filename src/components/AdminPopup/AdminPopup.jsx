import { useState } from "react";
import Button from "../Button/Button";
import { ClearIcon, WarningIcon } from "../icons";

const AdminPopup = ({ handleUpdate, onClick }) => {
  const [PopupOpen, setPopupOpen] = useState(false);
  return (
    <div>
      <Button
        label={"Admin"}
        classvalues={"h-[42px]"}
        onClick={() => {
          onClick();
          setPopupOpen(true);
        }}
      />

      {PopupOpen && (
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
              <p>
                Are you sure Do you want to submit this data to adminexpenses?
              </p>
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              <Button
                label="Yes"
                classvalues="w-full hover:bg-green-600 border-green-600 text-green-600"
                onClick={() => {
                  handleUpdate(true);
                  setPopupOpen(false);
                }}
              />
              <Button
                label="No"
                onClick={() => setPopupOpen(false)}
                classvalues="w-full hover:bg-rose-600 border-rose-600 text-rose-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPopup;
