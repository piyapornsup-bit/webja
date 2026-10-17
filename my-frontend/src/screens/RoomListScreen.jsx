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

    return (
        <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
            <h2>รายการห้องพักทั้งหมด</h2>
            <div style={{ display: 'flex', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
                <select value={filter.room_type} onChange={e => setFilter({...filter, room_type: e.target.value})} style={{ padding: '8px', borderRadius: '6px' }}>
                    <option value="">ทุกประเภท</option>
                    <option value="fan">ห้องพัดลม</option>
                    <option value="air">ห้องแอร์</option>
                </select>
                <select value={filter.floor} onChange={e => setFilter({...filter, floor: e.target.value})} style={{ padding: '8px', borderRadius: '6px' }}>
                    <option value="">ทุกชั้น</option>
                    <option value="1">ชั้น 1</option>
                    <option value="2">ชั้น 2</option>
                    <option value="3">ชั้น 3</option>
                </select>
                <select value={filter.status} onChange={e => setFilter({...filter, status: e.target.value})} style={{ padding: '8px', borderRadius: '6px' }}>
                    <option value="">ทุกสถานะ</option>
                    <option value="available">ว่าง</option>
                    <option value="reserved">จองแล้ว</option>
                </select>
                <button onClick={loadRooms} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    ค้นหา
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {rooms.map(r => (
                    <div key={r.id} style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>ห้อง {r.room_number}</h3>
                            <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '12px', background: r.status === 'available' ? '#dcfce7' : '#fef3c7', color: r.status === 'available' ? '#15803d' : '#b45309', fontWeight: 'bold' }}>
                                {r.status}
                            </span>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '13px', margin: '6px 0' }}>ชั้น {r.floor} • {r.room_type === 'air' ? 'ห้องแอร์' : 'ห้องพัดลม'}</p>
                        <p style={{ margin: '12px 0', fontSize: '14px', color: '#334155' }}>{r.details || '-'}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                            <strong style={{ color: '#2563eb', fontSize: '18px' }}>฿{Number(r.price).toLocaleString()}</strong>
                            <Link to={`/rooms/${r.id}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>รายละเอียด →</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}