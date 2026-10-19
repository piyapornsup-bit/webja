import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../api/roomApi';
import './RoomListScreen.css';

export default function RoomListScreen() {
    const [rooms, setRooms] = useState([]);
    const [filter, setFilter] = useState({ room_type: '', floor: '', status: '' });

    const loadRooms = async () => {
        const data = await getRooms(filter);
        setRooms(data);
    };

    useEffect(() => { loadRooms(); }, []);

    // ป้ายสถานะภาษาไทย
    const renderStatusBadge = (status) => {
        if (status === 'available') {
            return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>🟢 ว่าง</span>;
        } else if (status === 'reserved') {
            return <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>🔴 มีผู้เช่าแล้ว</span>;
        }
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>🟡 ปิดปรับปรุง</span>;
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '26px', color: '#0f172a', marginBottom: '20px' }}>รายการห้องพักทั้งหมด</h2>
            
            {/* กล่องค้นหาภาษาไทย */}
            <div style={{ display: 'flex', gap: '12px', background: '#ffffff', padding: '16px', borderRadius: '12px', marginBottom: '28px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <select value={filter.room_type} onChange={e => setFilter({...filter, room_type: e.target.value})} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    <option value="">ทุกประเภทห้อง</option>
                    <option value="fan">ห้องพัดลม</option>
                    <option value="air">ห้องปรับอากาศ (แอร์)</option>
                </select>
                <select value={filter.floor} onChange={e => setFilter({...filter, floor: e.target.value})} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    <option value="">ทุกชั้น</option>
                    <option value="1">ชั้น 1</option>
                    <option value="2">ชั้น 2</option>
                    <option value="3">ชั้น 3</option>
                    <option value="4">ชั้น 4</option>
                    <option value="5">ชั้น 5</option>
                </select>
                <select value={filter.status} onChange={e => setFilter({...filter, status: e.target.value})} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    <option value="">ทุกสถานะ</option>
                    <option value="available">ห้องว่าง</option>
                    <option value="reserved">มีผู้เช่าแล้ว</option>
                    <option value="maintenance">ปิดปรับปรุง</option>
                </select>
                <button onClick={loadRooms} style={{ background: '#15803d', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    ค้นหา
                </button>
            </div>

            {/* แสดงการ์ดห้องพักพร้อมรูปภาพ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {rooms.map(r => (
                    <div key={r.id} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            {/* รูปภาพห้องพัก */}
                            <img 
                                src={r.image_url || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500'} 
                                alt={`ห้อง ${r.room_number}`}
                                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>ห้อง {r.room_number}</h3>
                                    {renderStatusBadge(r.status)}
                                </div>
                                <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 10px 0' }}>
                                    ชั้น {r.floor} • {r.room_type === 'air' ? 'ห้องปรับอากาศ (แอร์)' : 'ห้องพัดลม'}
                                </p>
                                <p style={{ margin: '8px 0', fontSize: '13px', color: '#475569', lineHeight: '1.5', minHeight: '40px' }}>
                                    {r.details || 'ไม่มีรายละเอียดเพิ่มเติม'}
                                </p>
                                
                                {/* แสดงสถานะผู้พัก */}
                                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', fontSize: '12px', marginTop: '10px' }}>
                                    {r.status === 'available' ? (
                                        <span style={{ color: '#16a34a', fontWeight: '600' }}>✨ พร้อมเข้าอยู่ได้ทันที</span>
                                    ) : (
                                        <span style={{ color: '#dc2626', fontWeight: '600' }}>👤 ผู้พัก: {r.tenant_name || 'มีผู้เช่าแล้ว'}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #f1f5f9', background: '#fafafa' }}>
                            <strong style={{ color: '#15803d', fontSize: '18px' }}>฿{Number(r.price).toLocaleString()}<span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'normal' }}> /เดือน</span></strong>
                            <Link to={`/rooms/${r.id}`} style={{ color: '#15803d', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>ดูรายละเอียด →</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}