import { useState } from "react";
import { DeleteIcon } from "../icons";

const DeleteButton = ({ onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-2 bg-[#FDE8E4] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#F06548] hover:text-white focus:outline-none`}
      disabled={disabled}
    >
      {isHovered ? (
        <DeleteIcon color="#fff" width={18} height={18} />
      ) : (
        <DeleteIcon color="#F06548" width={18} height={18} />
      )}
    </button>
  );
};

export default DeleteButton;
