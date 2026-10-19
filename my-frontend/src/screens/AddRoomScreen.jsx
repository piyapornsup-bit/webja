import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../api/roomApi';
import './RoomForm.css';

export default function AddRoomScreen() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        room_number: '',
        room_type: 'fan',
        floor: 1,
        price: '',
        status: 'available',
        details: '',
        image_url: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createRoom(form);
        navigate('/admin', { 
            state: { successMessage: `เพิ่มห้องพักหมายเลข ${form.room_number} สำเร็จเรียบร้อยแล้ว` } 
        });
    };

    return (
        <div style={{ maxWidth: '480px', margin: '40px auto', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
            <h2>เพิ่มห้องพักใหม่ (Create)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <input type="text" placeholder="หมายเลขห้อง (เช่น 101)" required value={form.room_number} onChange={e => setForm({...form, room_number: e.target.value})} style={{ padding: '8px' }} />
                <select value={form.room_type} onChange={e => setForm({...form, room_type: e.target.value})} style={{ padding: '8px' }}>
                    <option value="fan">พัดลม</option>
                    <option value="air">แอร์</option>
                </select>
                <input type="number" placeholder="ชั้น" required value={form.floor} onChange={e => setForm({...form, floor: Number(e.target.value)})} style={{ padding: '8px' }} />
                <input type="number" placeholder="ราคาค่าเช่า" required value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} style={{ padding: '8px' }} />
                <input type="text" placeholder="ลิงก์รูปภาพห้องพัก (URL เช่น https://...)" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} style={{ padding: '8px' }} />
                <textarea placeholder="รายละเอียดสิ่งอำนวยความสะดวก" rows="3" value={form.details} onChange={e => setForm({...form, details: e.target.value})} style={{ padding: '8px' }} />
                <button type="submit" style={{ background: '#2563eb', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>เพิ่มห้อง</button>
            </form>
        </div>
    );
}