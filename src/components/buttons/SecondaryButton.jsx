import React from "react";

const SecondaryButton = ({ buttonText, bkgColor, textColor, action }) => {
  return (
    <button
      onClick={action}
      className="border border-white w-full max-w-[200px] h-[48px] text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-white hover:text-foreground transition-colors"
    >
      {buttonText ? buttonText : "Learn More"}
    </button>
  );
};

export default SecondaryButton;
