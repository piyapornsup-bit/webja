import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createRoom } from '../api/roomApi';
import './RoomForm.css';

export default function AddRoomScreen() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        room_number: '',
        room_type: 'fan',
        floor: 1,
        price: '',
        status: 'ว่าง',
        details: '',
        image_url: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRoom(form);
            navigate('/admin', { 
                state: { successMessage: `เพิ่มห้องพักหมายเลข ${form.room_number} สำเร็จ` } 
            });
        } catch (err) {
            console.error('Create failed:', err);
            alert('เกิดข้อผิดพลาดในการเพิ่มห้องพัก');
        }
    };

    return (
        <div className="roomform-container">
            <div className="roomform-header">
                <h2 className="roomform-title">🏠 เพิ่มห้องพักใหม่</h2>
                <Link to="/admin" className="btn-cancel-room">← กลับแดชบอร์ด</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="roomform-section-title">📌 ข้อมูลพื้นฐานห้องพัก</div>
                
                <div className="roomform-grid">
                    <div className="roomform-group">
                        <label>หมายเลขห้องพัก *</label>
                        <input 
                            type="text" 
                            required 
                            placeholder="เช่น 101, 202"
                            value={form.room_number} 
                            onChange={e => setForm({ ...form, room_number: e.target.value })} 
                        />
                    </div>

                    <div className="roomform-group">
                        <label>ประเภทห้องพัก</label>
                        <select value={form.room_type} onChange={e => setForm({ ...form, room_type: e.target.value })}>
                            <option value="fan">ห้องพัดลม</option>
                            <option value="air">ห้องปรับอากาศ (แอร์)</option>
                        </select>
                    </div>

                    <div className="roomform-group">
                        <label>ชั้นที่ตั้ง *</label>
                        <input 
                            type="number" 
                            required 
                            min="1"
                            max="10"
                            placeholder="เช่น 1, 2, 3"
                            value={form.floor} 
                            onChange={e => setForm({ ...form, floor: Number(e.target.value) })} 
                        />
                    </div>

                    <div className="roomform-group">
                        <label>ราคาค่าเช่า (บาท/เดือน) *</label>
                        <input 
                            type="number" 
                            required 
                            placeholder="เช่น 3500"
                            value={form.price} 
                            onChange={e => setForm({ ...form, price: Number(e.target.value) })} 
                        />
                    </div>

                    <div className="roomform-group full-width">
                        <label>สถานะเริ่มต้น</label>
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                            <option value="ว่าง">🟢 ว่าง (พร้อมให้จอง)</option>
                            <option value="ปิดปรับปรุง">🟡 ปิดปรับปรุง</option>
                        </select>
                    </div>

                    <div className="roomform-group full-width">
                        <label>ลิงก์รูปภาพห้องพัก (URL)</label>
                        <input 
                            type="text" 
                            placeholder="https://images.unsplash.com/..."
                            value={form.image_url} 
                            onChange={e => setForm({ ...form, image_url: e.target.value })} 
                        />
                    </div>

                    <div className="roomform-group full-width">
                        <label>รายละเอียดและสิ่งอำนวยความสะดวก</label>
                        <textarea 
                            rows="4" 
                            placeholder="ระบุสิ่งอำนวยความสะดวก เช่น เตียงเดี่ยว 3.5 ฟุต, โต๊ะเขียนหนังสือ, ตู้เสื้อผ้า, ระเบียง..."
                            value={form.details} 
                            onChange={e => setForm({ ...form, details: e.target.value })} 
                        />
                    </div>
                </div>

                <div className="roomform-actions">
                    <Link to="/admin" className="btn-cancel-room">ยกเลิก</Link>
                    <button type="submit" className="btn-save-room">+ เพิ่มห้องพักลงระบบ</button>
                </div>
            </form>
        </div>
    );
}