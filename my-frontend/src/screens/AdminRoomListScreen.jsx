import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRooms, deleteRoom } from '../api/roomApi';
import './AdminRoomListScreen.css';

export default function AdminRoomListScreen() {
    const [rooms, setRooms] = useState([]);
    const [toastMessage, setToastMessage] = useState('');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, roomNumber: '' });
    const location = useLocation();

    const fetchAll = async () => {
        const data = await getRooms();
        setRooms(data);
    };

    useEffect(() => {
        fetchAll();
        if (location.state && location.state.successMessage) {
            setToastMessage(location.state.successMessage);
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    // ฟังก์ชันเปิด Modal ถามยืนยัน
    const openDeleteModal = (id, roomNum) => {
        setDeleteModal({ isOpen: true, id, roomNumber: roomNum });
    };

    // ฟังก์ชันกดยืนยันลบห้องจริงจากใน Modal
    const handleConfirmDelete = async () => {
        if (!deleteModal.id) return;
        try {
            await deleteRoom(deleteModal.id);
            setToastMessage(`ลบห้องพักหมายเลข ${deleteModal.roomNumber} สำเร็จ`);
            setTimeout(() => setToastMessage(''), 3000);
            setDeleteModal({ isOpen: false, id: null, roomNumber: '' });
            fetchAll();
        } catch (error) {
            console.error('Delete error:', error);
            alert('เกิดข้อผิดพลาดในการลบห้องพัก');
        }
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 16px', fontFamily: 'sans-serif', position: 'relative' }}>
            
            {/* Modal ยืนยันการลบ ลอยเด่นตรงกลางจอ */}
            {deleteModal.isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.45)',
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999999
                }}>
                    <div style={{
                        background: '#ffffff',
                        padding: '28px',
                        borderRadius: '16px',
                        maxWidth: '400px',
                        width: '90%',
                        textAlign: 'center',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        animation: 'fadeIn 0.2s ease-out'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '26px',
                            margin: '0 auto 16px'
                        }}>
                            🗑️
                        </div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '19px', color: '#0f172a' }}>
                            ยืนยันการลบห้องพัก?
                        </h3>
                        <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
                            คุณต้องการลบ <strong>ห้อง {deleteModal.roomNumber}</strong> ออกจากระบบใช่หรือไม่ การดำเนินการนี้ไม่สามารถย้อนกลับได้
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, id: null, roomNumber: '' })}
                                style={{
                                    flex: 1,
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    background: '#ffffff',
                                    color: '#475569',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                style={{
                                    flex: 1,
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: '#dc2626',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                ยืนยันลบ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* กล่อง Toast แจ้งเตือนสไตล์คลีนการ์ดขาวขอบเขียว ลอยมุมขวาบน */}
            {toastMessage && (
                <div style={{
                    position: 'fixed',
                    top: '85px',
                    right: '25px',
                    backgroundColor: '#ffffff',
                    borderLeft: '6px solid #16a34a',
                    borderTop: '1px solid #e2e8f0',
                    borderRight: '1px solid #e2e8f0',
                    borderBottom: '1px solid #e2e8f0',
                    padding: '14px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 99999
                }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <div>
                        <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 'bold' }}>ทำรายการสำเร็จ</div>
                        <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600' }}>{toastMessage}</div>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>ระบบจัดการห้องพักและผู้เช่า (Admin Dashboard)</h2>
                <Link to="/admin/add" style={{ background: '#16a34a', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
                    + เพิ่มห้องพักใหม่
                </Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <thead>
                    <tr style={{ background: '#f8fafc', textAlign: 'left', fontSize: '13px', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '12px' }}>เลขห้อง</th>
                        <th style={{ padding: '12px' }}>ประเภท</th>
                        <th style={{ padding: '12px' }}>ชั้น</th>
                        <th style={{ padding: '12px' }}>ราคา</th>
                        <th style={{ padding: '12px' }}>สถานะห้อง</th>
                        <th style={{ padding: '12px' }}>ผู้เช่า / ผู้จอง</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(r => (
                        <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                            <td style={{ padding: '12px', fontWeight: 'bold' }}>{r.room_number}</td>
                            <td style={{ padding: '12px' }}>{r.room_type === 'air' ? 'แอร์' : 'พัดลม'}</td>
                            <td style={{ padding: '12px' }}>ชั้น {r.floor}</td>
                            <td style={{ padding: '12px' }}>฿{Number(r.price).toLocaleString()}</td>
                            <td style={{ padding: '12px' }}>
                                <span style={{ 
                                    padding: '4px 10px', 
                                    borderRadius: '12px', 
                                    fontSize: '12px', 
                                    fontWeight: 'bold',
                                    background: 
                                        (r.status === 'ว่าง' || r.status === 'available') ? '#dcfce7' :
                                        (r.status === 'จองแล้ว' || r.status === 'reserved') ? '#ffedd5' :
                                        (r.status === 'มีผู้เช่า' || r.status === 'occupied') ? '#fee2e2' : '#fef3c7',
                                    color: 
                                        (r.status === 'ว่าง' || r.status === 'available') ? '#15803d' :
                                        (r.status === 'จองแล้ว' || r.status === 'reserved') ? '#c2410c' :
                                        (r.status === 'มีผู้เช่า' || r.status === 'occupied') ? '#b91c1c' : '#b45309'
                                }}>
                                    {(r.status === 'ว่าง' || r.status === 'available') && '🟢 ว่าง'}
                                    {(r.status === 'จองแล้ว' || r.status === 'reserved') && '🟠 จองแล้ว'}
                                    {(r.status === 'มีผู้เช่า' || r.status === 'occupied') && '🔴 มีผู้เช่า'}
                                    {(r.status === 'ปิดปรับปรุง' || r.status === 'maintenance') && '🟡 ปิดซ่อม'}
                                </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                                {r.tenant_name ? (
                                    <div>
                                        <strong style={{ color: '#0f172a' }}>👤 {r.tenant_name}</strong>
                                        {r.student_id && (
                                            <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600' }}>
                                                🎓 รหัส: {r.student_id}
                                            </div>
                                        )}
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>📞 {r.tenant_phone || '-'}</div>
                                    </div>
                                ) : (
                                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>- ไม่มีผู้พัก -</span>
                                )}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                <Link to={`/admin/edit/${r.id}`} style={{ marginRight: '12px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>แก้ไข</Link>
                                <button 
                                    onClick={() => openDeleteModal(r.id, r.room_number)} 
                                    style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}