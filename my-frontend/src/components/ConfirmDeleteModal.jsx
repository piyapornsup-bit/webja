import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import "./ConfirmDeleteModal.css";

// Popup ยืนยันการลบ ใช้ร่วมกันทั้งหน้าสินค้าและหน้าสมาชิก
export default function ConfirmDeleteModal({ title, message, confirmText, onCancel, onConfirm }) {
  // กด Esc เพื่อปิด popup
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div className="confirmOverlay" onClick={onCancel}>
      <div
        className="confirmBox"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirmIcon">
          <Trash2 size={26} />
        </div>
        <h3>{title}</h3>
        <p className="confirmMessage">{message}</p>
        <p className="confirmWarning">เมื่อยืนยันแล้ว จะไม่สามารถกู้คืนข้อมูลได้</p>
        <div className="confirmButtons">
          <button className="confirmCancel" onClick={onCancel}>
            ยกเลิก
          </button>
          <button className="confirmDelete" onClick={onConfirm}>
            <Trash2 size={16} /> {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
