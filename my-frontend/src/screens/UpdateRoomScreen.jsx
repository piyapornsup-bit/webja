import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById, updateRoom } from '../api/roomApi';
import './RoomForm.css';

export default function UpdateRoomScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        room_number: '',
        room_type: 'fan',
        floor: 1,
        price: '',
        status: 'available',
        details: ''
    });

    useEffect(() => {
        getRoomById(id).then(data => {
            if (data) setForm(data);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateRoom(id, form);
        alert('แก้ไขข้อมูลห้องสำเร็จ');
        navigate('/admin');
    };

    return (
        <div style={{ maxWidth: '480px', margin: '40px auto', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
            <h2>แก้ไขข้อมูลห้องพัก (Update)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <input type="text" placeholder="หมายเลขห้อง" required value={form.room_number} onChange={e => setForm({...form, room_number: e.target.value})} style={{ padding: '8px' }} />
                <select value={form.room_type} onChange={e => setForm({...form, room_type: e.target.value})} style={{ padding: '8px' }}>
                    <option value="fan">พัดลม</option>
                    <option value="air">แอร์</option>
                </select>
                <input type="number" placeholder="ชั้น" required value={form.floor} onChange={e => setForm({...form, floor: Number(e.target.value)})} style={{ padding: '8px' }} />
                <input type="number" placeholder="ราคา" required value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} style={{ padding: '8px' }} />
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={{ padding: '8px' }}>
                    <option value="available">ว่าง (Available)</option>
                    <option value="reserved">จองแล้ว (Reserved)</option>
                    <option value="maintenance">ปิดซ่อม (Maintenance)</option>
                </select>
                <textarea placeholder="รายละเอียด" rows="3" value={form.details || ''} onChange={e => setForm({...form, details: e.target.value})} style={{ padding: '8px' }} />
                <button type="submit" style={{ background: '#2563eb', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>บันทึกการแก้ไข</button>
            </form>
        </div>
    );
}