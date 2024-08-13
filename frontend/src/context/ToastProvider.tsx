import React from "react";
import { ToastContext } from "./ToastContext";
import { toast } from "react-toastify";

interface IToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = (props: IToastProviderProps) => {
  const showToast = (type: "success" | "error", message: string) => {
    const toastOption = {
      autoClose: 2000,
    };
    if (type === "success") {
      toast.success(message, toastOption);
    } else {
      toast.error(message, toastOption);
    }
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
