import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../api/roomApi';
import './RoomListScreen.css';

export default function RoomListScreen() {
    const [rooms, setRooms] = useState([]);
    const [filter, setFilter] = useState({ room_type: '', floor: '', status: '' });
    const [loading, setLoading] = useState(false);

    const loadRooms = async (currentFilter = filter) => {
        setLoading(true);
        try {
            const data = await getRooms(currentFilter);
            setRooms(data || []);
        } catch (err) {
            console.error('Fetch error:', err);
            setRooms([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        loadRooms(); 
    }, []);

    // ฟังก์ชันล้างตัวกรองทั้งหมด
    const handleResetFilter = () => {
        const resetData = { room_type: '', floor: '', status: '' };
        setFilter(resetData);
        loadRooms(resetData);
    };

    // ป้ายสถานะห้อง
    const renderStatusBadge = (status) => {
        if (status === 'available') {
            return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>🟢 ว่าง</span>;
        } else if (status === 'reserved') {
            return <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>🔴 มีผู้เช่าแล้ว</span>;
        }
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>🟡 ปิดปรับปรุง</span>;
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '30px auto 60px', padding: '0 16px', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '26px', color: '#0f172a', marginBottom: '20px' }}>รายการห้องพักทั้งหมด</h2>
            
            {/* แถบตัวกรองค้นหา */}
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                alignItems: 'center',
                gap: '12px', 
                background: '#ffffff', 
                padding: '16px', 
                borderRadius: '12px', 
                marginBottom: '28px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)' 
            }}>
                <select 
                    value={filter.room_type} 
                    onChange={e => setFilter({...filter, room_type: e.target.value})} 
                    style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#ffffff', color: '#0f172a', fontSize: '14px' }}
                >
                    <option value="" style={{ color: '#0f172a' }}>ทุกประเภทห้อง</option>
                    <option value="fan" style={{ color: '#0f172a' }}>ห้องพัดลม</option>
                    <option value="air" style={{ color: '#0f172a' }}>ห้องปรับอากาศ (แอร์)</option>
                </select>

                <select 
                    value={filter.floor} 
                    onChange={e => setFilter({...filter, floor: e.target.value})} 
                    style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#ffffff', color: '#0f172a', fontSize: '14px' }}
                >
                    <option value="" style={{ color: '#0f172a' }}>ทุกชั้น</option>
                    <option value="1" style={{ color: '#0f172a' }}>ชั้น 1</option>
                    <option value="2" style={{ color: '#0f172a' }}>ชั้น 2</option>
                    <option value="3" style={{ color: '#0f172a' }}>ชั้น 3</option>
                    <option value="4" style={{ color: '#0f172a' }}>ชั้น 4</option>
                    <option value="5" style={{ color: '#0f172a' }}>ชั้น 5</option>
                </select>

                <select 
                    value={filter.status} 
                    onChange={e => setFilter({...filter, status: e.target.value})} 
                    style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#ffffff', color: '#0f172a', fontSize: '14px' }}
                >
                    <option value="" style={{ color: '#0f172a' }}>ทุกสถานะ</option>
                    <option value="available" style={{ color: '#0f172a' }}>🟢 ว่าง</option>
                    <option value="reserved" style={{ color: '#0f172a' }}>🔴 มีผู้เช่าแล้ว</option>
                    <option value="maintenance" style={{ color: '#0f172a' }}>🟡 ปิดปรับปรุง</option>
                </select>

                {/* ปุ่มค้นหา */}
                <button 
                    onClick={() => loadRooms(filter)} 
                    style={{ 
                        backgroundColor: '#15803d', 
                        color: '#ffffff', 
                        border: 'none', 
                        padding: '9px 24px', 
                        borderRadius: '8px', 
                        cursor: 'pointer', 
                        fontWeight: 'bold', 
                        fontSize: '14px' 
                    }}
                >
                    ค้นหา
                </button>

                {/* ปุ่มล้างตัวกรอง หน้าตาเหมือนปุ่มค้นหาเป๊ะ */}
                {(filter.room_type || filter.floor || filter.status) && (
                    <button 
                        onClick={handleResetFilter} 
                        style={{ 
                            backgroundColor: '#15803d', 
                            color: '#ffffff', 
                            border: 'none', 
                            padding: '9px 24px', 
                            borderRadius: '8px', 
                            cursor: 'pointer', 
                            fontWeight: 'bold', 
                            fontSize: '14px' 
                        }}
                    >
                        ล้างตัวกรอง
                    </button>
                )}
            </div>

            {/* แสดงสถานะกำลังโหลด */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
                    <p style={{ fontSize: '18px' }}>กำลังค้นหาข้อมูลห้องพัก...</p>
                </div>
            ) : rooms.length === 0 ? (
                /* กล่องแจ้งเตือนเมื่อไม่พบข้อมูล (Empty State) */
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px dashed #cbd5e1',
                    margin: '20px 0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ fontSize: '54px', marginBottom: '14px' }}>🔍</div>
                    <h3 style={{ fontSize: '20px', color: '#1e293b', margin: '0 0 8px 0' }}>ไม่พบข้อมูลห้องพักที่ตรงกับเงื่อนไข</h3>
                    <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.6' }}>
                        ไม่มีห้องพักตามเงื่อนไขประเภทห้อง ชั้น หรือสถานะที่คุณเลือกไว้ในขณะนี้ ลองเลือกเงื่อนไขใหม่อีกครั้ง
                    </p>
                    <button 
                        onClick={handleResetFilter}
                        style={{
                            backgroundColor: '#15803d',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        ดูรายการห้องพักทั้งหมด
                    </button>
                </div>
            ) : (
                /* รายการการ์ดห้องพัก */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {rooms.map(r => (
                        <div key={r.id} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <img 
                                    src={
                                        r.image_url 
                                            ? r.image_url.split(',')[0].trim() 
                                            : (r.room_type === 'air' ? 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500' : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500')
                                    } 
                                    alt={`ห้อง ${r.room_number}`}
                                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500';
                                    }}
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
            )}
        </div>
    );
}