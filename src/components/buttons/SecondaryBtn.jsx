import React from "react";

const SecondaryBtn = ({ buttonText, bkgColor, textColor }) => {
  return (
    <button className="border border-white w-full max-w-[200px] h-[48px] text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-white hover:text-primary transition-colors">
      {buttonText ? buttonText : "Learn More"}
    </button>
  );
};

export default SecondaryBtn;
