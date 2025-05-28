import React from "react";
import "../../styles/index.css";

const SmallerButton = ({
  buttonText,
  primary,
  secondary,
  border,
  action,
  destructive,
  bkgColor,
  textColor,
}) => {
  return (
    <button
      onClick={action}
      className={`
      ${primary ? "bg-white text-primary" : ""}
      ${secondary ? "bg-transparent border-[1px] border-white text-white" : ""}
      ${border ? "border border-primary" : ""}      
      ${destructive ? "bg-red-700 text-white hover:bg-red-500" : ""}
        px-6 py-2 rounded text-sm font-medium hover:bg-gray-300 transition-colors`}
    >
      {buttonText ? buttonText : "Get Started"}
    </button>
  );
};

export default SmallerButton;
