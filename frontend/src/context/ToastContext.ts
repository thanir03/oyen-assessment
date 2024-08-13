import React, { useContext } from "react";

interface IToastContext {
  showToast: (type: "success" | "error", message: string) => void;
}

const ToastContext = React.createContext<IToastContext>({
  showToast() {},
});

const useToast = () => {
  return useContext(ToastContext);
};

export { ToastContext, useToast };
