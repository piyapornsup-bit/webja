import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reserveRoom } from '../api/roomApi';
import './BookingScreen.css';

export default function BookingScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', phone: '', studentId: '' });

    const handleBooking = async (e) => {
        e.preventDefault();
        const res = await reserveRoom(id);
        if (res.message) {
            alert('จองห้องพักสำเร็จแล้ว!');
            navigate('/rooms');
        } else {
            alert(res.error || 'เกิดข้อผิดพลาดในการจอง');
        }
    };

    return (
        <div style={{ maxWidth: '480px', margin: '40px auto', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
            <h2>แบบฟอร์มยืนยันการจองห้อง</h2>
            <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>ชื่อ-นามสกุล *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>รหัสนิสิต *</label>
                    <input type="text" required value={form.studentId} onChange={e => setForm({...form, studentId: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>เบอร์โทรศัพท์ *</label>
                    <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                    ยืนยันการจองห้องพัก
                </button>
            </form>
        </div>
    );
}