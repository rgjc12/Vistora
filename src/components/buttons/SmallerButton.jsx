import React from "react";

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
      ${primary ? "bg-white text-primary" : ""}
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
