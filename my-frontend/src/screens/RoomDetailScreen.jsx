import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomById } from '../api/roomApi';
import './RoomDetailScreen.css';

export default function RoomDetailScreen() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    useEffect(() => {
        getRoomById(id).then(data => setRoom(data));
    }, [id]);

    if (!room) return <p style={{ textAlign: 'center', marginTop: '50px', color: '#64748b' }}>กำลังโหลดข้อมูลห้องพัก...</p>;

    // แยกชุดรูปภาพออกจากเครื่องหมายจุลภาค (,)
    let images = [];
    if (room.image_url && room.image_url.trim() !== '') {
        images = room.image_url.split(',').map(url => url.trim()).filter(url => url !== '');
    }
    
    // หากไม่มีรูปในฐานข้อมูล ให้ใช้รูปสำรองตามประเภทห้อง
    if (images.length === 0) {
        images = room.room_type === 'air' 
            ? ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800'] 
            : ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'];
    }

    // ฟังก์ชันเลื่อนรูปก่อนหน้า - ถัดไป
    const prevImage = () => {
        setActiveImgIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setActiveImgIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div style={{ maxWidth: '780px', margin: '40px auto', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            
            {/* โซนแสดงสไลด์รูปภาพ */}
            <div style={{ position: 'relative', width: '100%', height: '360px', background: '#0f172a' }}>
                <img 
                    src={images[activeImgIndex]} 
                    alt={`ห้อง ${room.room_number}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800';
                    }}
                />

                {/* ปุ่มเลื่อน ซ้าย - ขวา (จะแสดงเมื่อมีมากกว่า 1 รูป) */}
                {images.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage}
                            style={{
                                position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', width: '38px', height: '38px',
                                borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            ❮
                        </button>
                        <button 
                            onClick={nextImage}
                            style={{
                                position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', width: '38px', height: '38px',
                                borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            ❯
                        </button>
                        
                        {/* ป้ายบอกลำดับรูป เช่น 1/3 */}
                        <div style={{
                            position: 'absolute', bottom: '14px', right: '16px',
                            background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '4px 12px', borderRadius: '14px', fontSize: '12px'
                        }}>
                            📷 รูปที่ {activeImgIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>

            {/* แถบรูปย่อยด้านล่าง (Thumbnails) */}
            {images.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', padding: '12px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', overflowX: 'auto' }}>
                    {images.map((img, idx) => (
                        <img 
                            key={idx} 
                            src={img} 
                            alt="thumbnail" 
                            onClick={() => setActiveImgIndex(idx)}
                            style={{
                                width: '70px', height: '50px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer',
                                border: activeImgIndex === idx ? '2px solid #15803d' : '2px solid transparent',
                                opacity: activeImgIndex === idx ? 1 : 0.6
                            }}
                        />
                    ))}
                </div>
            )}

            {/* รายละเอียดข้อมูลห้อง */}
            <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h2 style={{ fontSize: '26px', color: '#0f172a', margin: 0 }}>ห้องพักหมายเลข {room.room_number}</h2>
                    <span style={{ color: '#15803d', fontSize: '26px', fontWeight: 'bold' }}>
                        ฿{Number(room.price).toLocaleString()}<span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'normal' }}> /เดือน</span>
                    </span>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    {room.status === 'available' ? (
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '5px 12px', borderRadius: '14px', fontSize: '13px', fontWeight: 'bold' }}>🟢 ห้องว่าง (พร้อมเข้าอยู่)</span>
                    ) : (
                        <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '5px 12px', borderRadius: '14px', fontSize: '13px', fontWeight: 'bold' }}>🔴 มีผู้เช่าแล้ว / จองแล้ว</span>
                    )}
                </div>

                <hr style={{ margin: '18px 0', borderColor: '#f1f5f9' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '14px', color: '#334155' }}>
                    <p style={{ margin: 0 }}><strong>ประเภทห้องพัก:</strong> {room.room_type === 'air' ? 'ห้องปรับอากาศ (แอร์)' : 'ห้องพัดลม'}</p>
                    <p style={{ margin: 0 }}><strong>ตำแหน่งชั้น:</strong> ชั้น {room.floor}</p>
                    <p style={{ margin: 0 }}><strong>เงินประกันสัญญา:</strong> 5,000 บาท</p>
                    <p style={{ margin: 0 }}><strong>สัญญาเช่า:</strong> ขั้นต่ำ 4 เดือน</p>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #f1f5f9', margin: '20px 0', fontSize: '13px' }}>
                    <strong style={{ color: '#1e293b' }}>สถานะผู้พักอาศัย: </strong>
                    {room.status === 'available' ? (
                        <span style={{ color: '#16a34a' }}>✨ ห้องนี้ยังว่างอยู่ สามารถจองได้ทันที</span>
                    ) : (
                        <span style={{ color: '#b91c1c' }}>👤 ผู้พัก: {room.tenant_name || 'มีผู้เช่าแล้ว'} {room.tenant_phone && `(โทร ${room.tenant_phone})`}</span>
                    )}
                </div>

                <h4 style={{ margin: '16px 0 6px 0', color: '#0f172a' }}>รายละเอียดและสิ่งอำนวยความสะดวก:</h4>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {room.details || 'เตียงนอน, ตู้เสื้อผ้า, โต๊ะอ่านหนังสือ, เครื่องทำน้ำอุ่น'}
                </p>

                <div style={{ marginTop: '28px', display: 'flex', gap: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                    <Link to="/rooms" style={{ padding: '10px 20px', border: '1px solid #cbd5e1', borderRadius: '8px', textDecoration: 'none', color: '#475569', fontWeight: 'bold', fontSize: '14px' }}>
                        ← ย้อนกลับ
                    </Link>
                    {room.status === 'available' && (
                        <Link to={`/booking/${room.id}`} style={{ padding: '10px 26px', background: '#15803d', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                            จองห้องพักนี้ทันที
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}