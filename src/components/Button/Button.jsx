import { useState } from "react";

const Button = ({
  label,
  icon1,
  icon2,
  onClick,
  className,
  type = "button",
  form,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-1 p-2 border border-[#9e77d2] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#9E77D2] hover:text-white focus:outline-none ${className}`}
      disabled={disabled}
    >
      {isHovered ? icon1 : icon2}
      {label ? label : null}
    </button>
  );
};

export default Button;
