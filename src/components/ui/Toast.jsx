import { AlertCircle, CheckCircle2 } from "lucide-react";
import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "text-green-500"
      : type === "error"
      ? "text-red-500"
      : "text-neutral-700";

  const icon =
    type === "success" ? (
      <CheckCircle2 />
    ) : type === "error" ? (
      <AlertCircle />
    ) : (
      ""
    );

  return (
    <div className={`fixed top-4 left-0 right-0 w-[275px] mx-auto z-50`}>
      <div
        className={`bg-white border border-neutral-200 px-4 py-3 rounded-xl shadow-md flex gap-2 items-center justify-center ${bgColor}`}
      >
        <span>{icon}</span>
        {message}
      </div>
    </div>
  );
};

export default Toast;
