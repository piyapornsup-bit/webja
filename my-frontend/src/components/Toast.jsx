import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import "./Toast.css";

// แจ้งเตือนมุมบนของหน้าจอ หายเองใน 3 วินาที
// type = "success" (สีเขียว) หรือ "error" (สีแดง)
export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`toastBox toast_${type}`} role="status">
      {type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="toastMessage">{message}</span>
      <button type="button" className="toastClose" onClick={onClose} aria-label="ปิดการแจ้งเตือน">
        <X size={16} />
      </button>
    </div>
  );
}
