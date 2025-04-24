import React from "react";

const FormBtn = ({ buttonText, rounded, action }) => {
  return (
    <button
      onClick={action}
      className="bg-[#6b1d1d] hover:bg-[#4a0f0f] focus:outline-none text-white w-full rounded-md h-[48px] px-6 py-2 text-sm font-medium transition-colors"
    >
      {buttonText ? buttonText : "Get Started"}
    </button>
  );
};

export default FormBtn;
