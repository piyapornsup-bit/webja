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

    if (!room) return <p style={{ textAlign: 'center', marginTop: '40px' }}>กำลังโหลด...</p>;

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>ห้องพักหมายเลข {room.room_number}</h2>
                <span style={{ color: '#2563eb', fontSize: '24px', fontWeight: 'bold' }}>฿{Number(room.price).toLocaleString()}</span>
            </div>
            <hr style={{ margin: '20px 0', borderColor: '#f1f5f9' }} />
            <p><strong>ประเภทห้อง:</strong> {room.room_type === 'air' ? 'ห้องปรับอากาศ (แอร์)' : 'ห้องพัดลม'}</p>
            <p><strong>ตำแหน่ง:</strong> ชั้น {room.floor}</p>
            <p><strong>สถานะปัจจุบัน:</strong> {room.status}</p>
            <p><strong>รายละเอียดสิ่งอำนวยความสะดวก:</strong> {room.details || '-'}</p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '12px' }}>
                <Link to="/rooms" style={{ padding: '10px 20px', border: '1px solid #cbd5e1', borderRadius: '6px', textDecoration: 'none', color: '#475569' }}>ย้อนกลับ</Link>
                {room.status === 'available' && (
                    <Link to={`/booking/${room.id}`} style={{ padding: '10px 24px', background: '#2563eb', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
                        จองห้องพักนี้
                    </Link>
                )}
            </div>
        </div>
    );
}