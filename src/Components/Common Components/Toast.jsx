import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../../store/Slices/toastSlice";

const Toast = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => dispatch(removeToast(toast.id)), 3000)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-6 right-6 space-y-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-500 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
