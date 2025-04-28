import React from "react";
import "../../styles/index.css";

const SmallerButton = ({
  buttonText,
  primary,
  secondary,
  action,
  bkgColor,
  textColor,
}) => {
  return (
    <button
      onClick={action}
      className={`
      ${primary ? "bg-white text-[#800020]" : ""}
      ${
        secondary ? "bg-transparent border-[1px] border-white text-white" : ""
      }      
        px-6 py-2 rounded text-sm font-medium hover:bg-gray-300 transition-colors`}
    >
      {buttonText ? buttonText : "Get Started"}
    </button>
  );
};

export default SmallerButton;
