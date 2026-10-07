import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserCheck, ArrowLeft, Save, Loader2 } from "lucide-react";
import { getMemberById, updateMember } from "../api/memberAPI";
import "./UpdateMember.css";

export default function UpdateMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    status: "active",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMember();
  }, [id]);

  async function fetchMember() {
    setIsLoading(true);
    try {
      const data = await getMemberById(id);
      if (data) {
        setFormData({
          name: data.name || "",
          username: data.username || "",
          phone: data.phone || "",
          status: data.status || "active",
        });
      } else {
        setErrorMessage("ไม่พบข้อมูลสมาชิกที่ระบุ");
      }
    } catch (err) {
      console.error("Error fetching member:", err);
      setErrorMessage("เกิดข้อผิดพลาดในการโหลดข้อมูลสมาชิก");
    } finally {
      setIsLoading(false);
    }
  }

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
      await updateMember(id, formData);
      navigate("/");
    } catch (err) {
      console.error("Error updating member:", err);
      alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
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
            <UserCheck size={26} className="iconGreen" />
            <h2>แก้ไขข้อมูลสมาชิก</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="loadingBox">
            <Loader2 size={32} className="spinIcon" />
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        ) : errorMessage ? (
          <div className="errorCard">
            <p>{errorMessage}</p>
            <Link to="/" className="btnBackHome">กลับสู่หน้าหลัก</Link>
          </div>
        ) : (
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
                placeholder="กรอก username"
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
                placeholder="กรอกเบอร์โทรศัพท์"
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
                    <span>บันทึกการแก้ไข</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
