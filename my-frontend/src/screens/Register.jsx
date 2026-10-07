import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, ArrowLeft, Save, Loader2 } from "lucide-react";
import { createMember } from "../api/memberAPI";
import "./UpdateMember.css"; // Reuse form styling

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    status: "active",
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.username.trim()) {
      alert("กรุณากรอกชื่อและ username ให้ครบถ้วน");
      return;
    }

    setIsSaving(true);
    try {
      await createMember(formData);
      navigate("/");
    } catch (err) {
      console.error("Error creating member:", err);
      alert("เกิดข้อผิดพลาดในการเพิ่มสมาชิก");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="formPageWrapper">
      <div className="formContainerCard">
        <div className="formHeaderBanner">
          <Link to="/" className="btnBack">
            <ArrowLeft size={20} />
            <span>ย้อนกลับ</span>
          </Link>
          <div className="formHeaderTitle">
            <UserPlus size={26} className="iconGreen" />
            <h2>เพิ่มข้อมูลสมาชิกใหม่</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="memberForm">
          <div className="formGroup">
            <label htmlFor="name">ชื่อ - นามสกุล <span className="req">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="กรอกชื่อ - นามสกุล"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="username">Username <span className="req">*</span></label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="เช่น u101"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="เช่น 0812345678"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="status">สถานะการใช้งาน</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">ใช้งาน (active)</option>
              <option value="inactive">ไม่ใช้งาน (inactive)</option>
            </select>
          </div>

          <div className="formActions">
            <Link to="/" className="btnCancelForm">
              ยกเลิก
            </Link>
            <button type="submit" className="btnSubmitForm" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 size={18} className="spinIcon" />
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>บันทึกสมาชิก</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
