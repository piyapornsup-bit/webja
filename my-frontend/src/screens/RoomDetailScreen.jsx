import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomById } from '../api/roomApi';
import './RoomDetailScreen.css';

export default function RoomDetailScreen() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        getRoomById(id).then(data => setRoom(data));
    }, [id]);

    if (!room) return <p style={{ textAlign: 'center', marginTop: '50px', color: '#64748b' }}>กำลังโหลดข้อมูลห้องพัก...</p>;

    // กำหนดป้ายสถานะภาษาไทย
    const renderStatusBadge = (status) => {
        if (status === 'available') {
            return <span style={{ background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold' }}>🟢 ห้องว่าง (พร้อมเข้าอยู่)</span>;
        } else if (status === 'reserved') {
            return <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '6px 14px', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold' }}>🔴 มีผู้เช่าแล้ว / จองแล้ว</span>;
        }
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '6px 14px', borderRadius: '16px', fontSize: '14px', fontWeight: 'bold' }}>🟡 ปิดปรับปรุงชั่วคราว</span>;
    };

    return (
        <div style={{ maxWidth: '750px', margin: '40px auto', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* รูปภาพห้องพักขนาดใหญ่ด้านบน */}
            <img 
                src={room.image_url || (room.room_type === 'air' ? 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800' : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800')} 
                alt={`ห้องพัก ${room.room_number}`}
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
            />

            <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '28px', color: '#0f172a', margin: 0 }}>ห้องพักหมายเลข {room.room_number}</h2>
                    <span style={{ color: '#15803d', fontSize: '28px', fontWeight: 'bold' }}>฿{Number(room.price).toLocaleString()}<span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'normal' }}> /เดือน</span></span>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    {renderStatusBadge(room.status)}
                </div>

                <hr style={{ margin: '20px 0', borderColor: '#f1f5f9' }} />

                {/* ข้อมูลสเปกห้อง */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '15px', color: '#334155', marginBottom: '20px' }}>
                    <p style={{ margin: 0 }}><strong>ประเภทห้องพัก:</strong> {room.room_type === 'air' ? 'ห้องปรับอากาศ (แอร์)' : 'ห้องพัดลม'}</p>
                    <p style={{ margin: 0 }}><strong>ตำแหน่งชั้น:</strong> ชั้น {room.floor}</p>
                    <p style={{ margin: 0 }}><strong>เงินมัดจำ/ประกัน:</strong> 5,000 บาท</p>
                    <p style={{ margin: 0 }}><strong>สัญญาเช่า:</strong> ขั้นต่ำ 4 เดือน</p>
                </div>

                {/* ข้อมูลผู้เช่าปัจจุบัน (ถ้ามี) */}
                <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', border: '1px solid #f1f5f9', margin: '20px 0' }}>
                    <strong style={{ display: 'block', marginBottom: '6px', color: '#1e293b' }}>สถานะผู้พักอาศัย:</strong>
                    {room.status === 'available' ? (
                        <span style={{ color: '#16a34a', fontSize: '14px' }}>✨ ห้องนี้ยังว่างอยู่ สามารถกดจองได้ทันที</span>
                    ) : (
                        <div style={{ fontSize: '14px', color: '#b91c1c' }}>
                            <p style={{ margin: '2px 0' }}>👤 ผู้พัก: {room.tenant_name || 'มีผู้เช่าแล้ว'}</p>
                            {room.tenant_phone && <p style={{ margin: '2px 0', color: '#64748b' }}>📞 เบอร์โทรศัพท์: {room.tenant_phone}</p>}
                        </div>
                    )}
                </div>

                <h4 style={{ margin: '20px 0 8px 0', color: '#0f172a' }}>รายละเอียดและสิ่งอำนวยความสะดวกในห้อง:</h4>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                    {room.details || 'เตียงนอน, ตู้เสื้อผ้า, โต๊ะอ่านหนังสือ, ห้องน้ำในตัว'}
                </p>

                {/* ปุ่มควบคุม */}
                <div style={{ marginTop: '36px', display: 'flex', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                    <Link to="/rooms" style={{ padding: '10px 22px', border: '1px solid #cbd5e1', borderRadius: '8px', textDecoration: 'none', color: '#475569', fontWeight: 'bold' }}>
                        ← ย้อนกลับ
                    </Link>
                    {room.status === 'available' && (
                        <Link to={`/booking/${room.id}`} style={{ padding: '10px 28px', background: '#15803d', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                            จองห้องพักนี้ทันที
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}