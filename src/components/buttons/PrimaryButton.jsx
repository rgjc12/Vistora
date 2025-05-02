import React from "react";

const PrimaryButton = ({
  buttonText,
  bkgColor,
  textColor,
  action,
  rounded,
}) => {
  return (
    <button
      onClick={action}
      className={`${bkgColor ? bkgColor : "bg-white"} ${
        textColor ? textColor : "text-primary"
      } w-full max-w-[200px] h-[48px] px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-300 transition-colors"`}
    >
      {buttonText ? buttonText : "Get Started"}
    </button>
  );
};

export default PrimaryButton;
