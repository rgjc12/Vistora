import React from "react";

const DashButton = ({
  primary,
  secondary,
  neutral,
  big,
  action,
  text,
  icon,
}) => {
  return (
    <button
      onClick={action}
      className={`${big ? "w-full min-w-[250px]" : "w-fit"} 
      ${
        primary
          ? "bg-primary text-white hover:bg-primary-light"
          : secondary
          ? "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
          : "bg-black text-white hover:bg-neutral-800"
      }
      max-w-[350px] px-6 py-2 min-h-8 min-w-[140px] text-center text-[0.85rem] flex items-center justify-center gap-1
      `}
    >
      <span className={`${icon ? "block" : "hidden"}`}>{icon}</span>
      {text ? text : "Button Text"}
    </button>
  );
};

export default DashButton;
