import { useState } from "react";
import { EditIcon } from "../icons";

const EditButton = ({ onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-2 bg-[#DFF0FA] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#299CDB] hover:text-white focus:outline-none`}
      disabled={disabled}
    >
      {isHovered ? <EditIcon color="#fff" /> : <EditIcon color="#299CDB" />}
    </button>
  );
};

export default EditButton;
