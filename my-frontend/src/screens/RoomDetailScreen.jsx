import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomById } from '../api/roomApi';
import './RoomDetailScreen.css';

export default function RoomDetailScreen() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRoomById(id)
            .then(data => setRoom(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>กำลังโหลดข้อมูลห้องพัก...</div>;
    if (!room) return <div style={{ textAlign: 'center', padding: '60px' }}>ไม่พบข้อมูลห้องพัก</div>;

    // เช็กสถานะห้องว่าง (รองรับทั้งภาษาไทยและอังกฤษ)
    const isAvailable = room.status === 'ว่าง' || room.status === 'available';
    const isReserved = room.status === 'จองแล้ว' || room.status === 'reserved';
    const isOccupied = room.status === 'มีผู้เช่า' || room.status === 'occupied';
    const isMaintenance = room.status === 'ปิดปรับปรุง' || room.status === 'maintenance';

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto 80px', padding: '0 20px', fontFamily: 'sans-serif' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                
                {/* รูปภาพห้องพัก */}
                <img 
                    src={
                        room.image_url 
                            ? room.image_url.split(',')[0].trim() 
                            : (room.room_type === 'air' ? 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800' : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800')
                    } 
                    alt={`ห้อง ${room.room_number}`}
                    style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800';
                    }}
                />

                <div style={{ padding: '32px' }}>
                    
                    {/* หัวข้อและราคา */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                            <h1 style={{ fontSize: '28px', color: '#0f172a', margin: '0 0 10px 0' }}>ห้องพักหมายเลข {room.room_number}</h1>
                            
                            {/* ป้ายสถานะ */}
                            {isAvailable && (
                                <span style={{ background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'inline-block' }}>
                                    🟢 ห้องว่าง (พร้อมเข้าอยู่)
                                </span>
                            )}
                            {isReserved && (
                                <span style={{ background: '#ffedd5', color: '#c2410c', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'inline-block' }}>
                                    🟠 จองแล้ว
                                </span>
                            )}
                            {isOccupied && (
                                <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'inline-block' }}>
                                    🔴 มีผู้เช่าแล้ว
                                </span>
                            )}
                            {isMaintenance && (
                                <span style={{ background: '#fef3c7', color: '#b45309', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'inline-block' }}>
                                    🟡 ปิดปรับปรุง
                                </span>
                            )}
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#15803d' }}>฿{Number(room.price).toLocaleString()}</span>
                            <span style={{ fontSize: '14px', color: '#64748b' }}> /เดือน</span>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '24px 0' }} />

                    {/* ข้อมูลทั่วไป */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px', fontSize: '14px', color: '#334155' }}>
                        <div><strong>ประเภทห้องพัก:</strong> {room.room_type === 'air' ? 'ห้องปรับอากาศ (แอร์)' : 'ห้องพัดลม'}</div>
                        <div><strong>ตำแหน่งชั้น:</strong> ชั้น {room.floor}</div>
                        <div><strong>เงินประกันสัญญา:</strong> 5,000 บาท</div>
                        <div><strong>สัญญาเช่า:</strong> ขั้นต่ำ 4 เดือน</div>
                    </div>

                    {/* แถบแสดงสถานะผู้พัก */}
                    <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '10px', fontSize: '13px', marginBottom: '24px' }}>
                        {isAvailable ? (
                            <span style={{ color: '#16a34a', fontWeight: '600' }}>✨ สถานะผู้พักอาศัย: ห้องนี้ยังว่างอยู่ สามารถจองได้ทันที</span>
                        ) : isReserved ? (
                            <span style={{ color: '#c2410c', fontWeight: '600' }}>📝 สถานะผู้พักอาศัย: ผู้จอง {room.tenant_name || 'ติดจองแล้ว'}</span>
                        ) : isOccupied ? (
                            <span style={{ color: '#dc2626', fontWeight: '600' }}>👤 สถานะผู้พักอาศัย: ผู้เช่า {room.tenant_name || 'มีผู้เช่าแล้ว'}</span>
                        ) : (
                            <span style={{ color: '#b45309', fontWeight: '600' }}>🔧 สถานะห้องพัก: อยู่ระหว่างปิดปรับปรุงชั่วคราว</span>
                        )}
                    </div>

                    {/* รายละเอียด */}
                    <h3 style={{ fontSize: '16px', color: '#0f172a', marginBottom: '8px' }}>รายละเอียดและสิ่งอำนวยความสะดวก:</h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.7', margin: '0 0 32px 0' }}>
                        {room.details || 'ไม่มีรายละเอียดเพิ่มเติมสำหรับห้องนี้'}
                    </p>

                    {/* ปุ่มการกระทำ */}
                    <div style={{ display: 'flex', gap: '14px' }}>
                        <Link 
                            to="/rooms" 
                            style={{ 
                                padding: '12px 24px', 
                                borderRadius: '10px', 
                                border: '1px solid #cbd5e1', 
                                background: '#ffffff', 
                                color: '#475569', 
                                textDecoration: 'none', 
                                fontWeight: '600', 
                                fontSize: '14px' 
                            }}
                        >
                            ← ย้อนกลับ
                        </Link>

                        {isAvailable && (
                            <Link 
                                to={`/booking/${room.id}`} 
                                style={{ 
                                    padding: '12px 28px', 
                                    borderRadius: '10px', 
                                    border: 'none', 
                                    background: '#15803d', 
                                    color: '#ffffff', 
                                    textDecoration: 'none', 
                                    fontWeight: 'bold', 
                                    fontSize: '14px',
                                    boxShadow: '0 4px 10px rgba(21, 128, 61, 0.2)'
                                }}
                            >
                                จองห้องพักนี้ทันที
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}