import React, { useState, createContext, useContext } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastManager = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ message, type }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 left-0 right-0 mx-auto space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastManager;
