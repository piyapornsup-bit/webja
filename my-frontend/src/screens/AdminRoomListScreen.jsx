import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRooms, deleteRoom } from '../api/roomApi';
import './AdminRoomListScreen.css';

export default function AdminRoomListScreen() {
    const [rooms, setRooms] = useState([]);

    const fetchAll = async () => {
        const data = await getRooms();
        setRooms(data);
    };

    useEffect(() => { fetchAll(); }, []);

    const handleDelete = async (id, roomNum) => {
        if (!window.confirm(`ต้องการลบห้อง ${roomNum} หรือไม่?`)) return;
        await deleteRoom(id);
        fetchAll();
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
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
                                    background: r.status === 'available' ? '#dcfce7' : (r.status === 'reserved' ? '#fee2e2' : '#fef3c7'),
                                    color: r.status === 'available' ? '#15803d' : (r.status === 'reserved' ? '#b91c1c' : '#b45309')
                                }}>
                                    {r.status === 'available' ? '🟢 ว่าง' : (r.status === 'reserved' ? '🔴 จองแล้ว' : '🟡 ปิดซ่อม')}
                                </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                                {r.tenant_name ? (
                                    <div>
                                        <strong style={{ color: '#0f172a' }}>👤 {r.tenant_name}</strong>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>📞 {r.tenant_phone || '-'}</div>
                                    </div>
                                ) : (
                                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>- ไม่มีผู้พัก -</span>
                                )}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                <Link to={`/admin/edit/${r.id}`} style={{ marginRight: '12px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>แก้ไข</Link>
                                <button onClick={() => handleDelete(r.id, r.room_number)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>ลบ</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}