import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Search, Pencil, Trash2, UserPlus, AlertTriangle, CheckCircle, X } from "lucide-react";
import { getAllMembers, deleteMember } from "../api/memberAPI";
import "./ListMember.css";

export default function ListMember() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  
  // State for delete modal & toast notification
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setIsLoading(true);
    try {
      const data = await getAllMembers();
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading members:", err);
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  }

  function openDeleteModal(id, name) {
    setDeleteTarget({ id, name });
  }

  function closeDeleteModal() {
    if (!isDeleting) {
      setDeleteTarget(null);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteMember(deleteTarget.id);
      showToast(`ลบข้อมูล "${deleteTarget.name}" เรียบร้อยแล้ว`);
      await loadMembers();
    } catch (err) {
      console.error("Error deleting member:", err);
      showToast("เกิดข้อผิดพลาดในการลบข้อมูล", "error");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  }

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  }

  const filteredMembers = members.filter((member) => {
    const keyword = searchText.toLowerCase().trim();
    if (!keyword) return true;
    const nameMatch = member.name ? member.name.toLowerCase().includes(keyword) : false;
    const usernameMatch = member.username ? member.username.toLowerCase().includes(keyword) : false;
    const phoneMatch = member.phone ? member.phone.includes(keyword) : false;
    return nameMatch || usernameMatch || phoneMatch;
  });

  return (
    <div className="pageWrapper">
      {/* Top Banner Title as shown in presentation slide */}
      <div className="outputTitleContainer">
        <h1 className="outputTitle">ผลลัพธ์</h1>
        <div className="titleUnderline"></div>
      </div>

      <div className="mainContainer">
        {/* Header Card (Soft Green Box) */}
        <div className="headerCard">
          <div className="headerTitleGroup">
            <div className="headerIconBadge">
              <Users size={26} className="headerIcon" />
            </div>
            <h2 className="headerTitleText">รายการสมาชิก</h2>
          </div>

          <div className="headerRightActions">
            <div className="searchBox">
              <Search size={18} className="searchIcon" />
              <input
                type="text"
                className="searchInput"
                placeholder="ค้นหาชื่อ หรือ username..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <button className="clearSearchBtn" onClick={() => setSearchText("")}>
                  <X size={14} />
                </button>
              )}
            </div>

            <Link to="/register" className="btnAddMember">
              <UserPlus size={18} />
              <span>เพิ่มสมาชิก</span>
            </Link>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="toastSuccess">
            <CheckCircle size={18} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Table Content */}
        {isLoading ? (
          <div className="loadingBox">
            <div className="spinner"></div>
            <p>กำลังโหลดข้อมูลสมาชิก...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="emptyStateCard">
            <Users size={48} className="emptyIcon" />
            <h3>ไม่พบข้อมูลสมาชิก</h3>
            <p>{searchText ? `ไม่พบสมาชิกที่ตรงกับคำค้นหา "${searchText}"` : "ยังไม่มีข้อมูลสมาชิกในระบบ"}</p>
            <Link to="/register" className="btnAddFirst">
              + เพิ่มสมาชิกรายแรก
            </Link>
          </div>
        ) : (
          <div className="tableWrapper">
            <table className="memberTable">
              <thead>
                <tr>
                  <th className="th-center" style={{ width: "80px" }}>ลำดับ</th>
                  <th>ชื่อ - นามสกุล</th>
                  <th style={{ width: "160px" }}>username</th>
                  <th className="th-center" style={{ width: "180px" }}>เบอร์โทรศัพท์</th>
                  <th className="th-center" style={{ width: "140px" }}>สถานะ</th>
                  <th className="th-center" style={{ width: "200px" }}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => {
                  const memberId = member.nisit_id || member.id;
                  const isActive = member.status === "active" || member.status === "ใช้งาน";

                  return (
                    <tr key={memberId || index}>
                      <td className="td-center font-medium">{index + 1}</td>
                      <td className="font-semibold text-dark">{member.name}</td>
                      <td className="text-secondary">{member.username}</td>
                      <td className="td-center text-secondary">{member.phone || "-"}</td>
                      <td className="td-center">
                        <span className={`statusBadge ${isActive ? "statusActive" : "statusInactive"}`}>
                          {isActive ? "ใช้งาน" : "ไม่ใช้งาน"}
                        </span>
                      </td>
                      <td className="td-center">
                        <div className="actionButtonsGroup">
                          <Link to={`/update/${memberId}`} className="btnEdit">
                            <Pencil size={15} />
                            <span>แก้ไข</span>
                          </Link>

                          <button
                            className="btnDelete"
                            onClick={() => openDeleteModal(memberId, member.name)}
                            title="ลบสมาชิก"
                          >
                            <Trash2 size={15} />
                            <span>ลบ</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {deleteTarget && (
        <div className="modalOverlay" onClick={closeDeleteModal}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <div className="modalIconDanger">
                <AlertTriangle size={24} />
              </div>
              <h3>ยืนยันการลบข้อมูล</h3>
            </div>
            <div className="modalBody">
              คุณต้องการลบข้อมูลสมาชิก <strong>"{deleteTarget.name}"</strong> ใช่หรือไม่?
              <br />
              <span className="text-sub">การดำเนินการนี้ไม่สามารถยกเลิกได้</span>
            </div>
            <div className="modalFooter">
              <button
                className="btnCancelModal"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                ยกเลิก
              </button>
              <button
                className="btnConfirmDeleteModal"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "กำลังลบ..." : "ยืนยันลบ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}