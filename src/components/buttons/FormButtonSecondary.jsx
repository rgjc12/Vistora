import React from "react";

const FormButtonSecondary = ({ buttonText, action }) => {
  return (
    <button
      onClick={action}
      className="w-full h-[48px] rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-[#6b1d1d] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
    >
      {buttonText ? buttonText : "Get Started"}
    </button>
  );
};

export default FormButtonSecondary;
