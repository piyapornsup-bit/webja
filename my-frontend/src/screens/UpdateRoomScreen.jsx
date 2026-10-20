import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
        status: 'ว่าง',
        details: '',
        tenant_name: '',
        student_id: '',
        tenant_phone: '',
        image_url: ''
    });

    useEffect(() => {
        getRoomById(id).then(data => {
            if (data) setForm(data);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRoom(id, form);
            navigate('/admin', { 
                state: { successMessage: `แก้ไขข้อมูลห้อง ${form.room_number} สำเร็จเรียบร้อยแล้ว` } 
            });
        } catch (err) {
            console.error('Update failed:', err);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    return (
        <div className="roomform-container">
            <div className="roomform-header">
                <h2 className="roomform-title">✏️ แก้ไขข้อมูลห้องพัก (ห้อง {form.room_number})</h2>
                <Link to="/admin" className="btn-cancel-room">← กลับแดชบอร์ด</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="roomform-section-title">📌 ข้อมูลกายภาพห้องพัก</div>
                
                <div className="roomform-grid">
                    <div className="roomform-group">
                        <label>หมายเลขห้องพัก *</label>
                        <input 
                            type="text" 
                            required 
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
                            value={form.floor} 
                            onChange={e => setForm({ ...form, floor: Number(e.target.value) })} 
                        />
                    </div>

                    <div className="roomform-group">
                        <label>ราคาค่าเช่า (บาท/เดือน) *</label>
                        <input 
                            type="number" 
                            required 
                            value={form.price} 
                            onChange={e => setForm({ ...form, price: Number(e.target.value) })} 
                        />
                    </div>

                    <div className="roomform-group full-width">
                        <label>สถานะห้องพัก</label>
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                            <option value="ว่าง">🟢 ห้องว่าง (Available)</option>
                            <option value="จองแล้ว">🟠 จองแล้ว (Reserved)</option>
                            <option value="มีผู้เช่า">🔴 มีผู้เช่าแล้ว (Occupied)</option>
                            <option value="ปิดปรับปรุง">🟡 ปิดปรับปรุง (Maintenance)</option>
                        </select>
                    </div>
                </div>

                <div className="roomform-section-title">👤 ข้อมูลผู้เช่า / ผู้จอง</div>
                
                <div className="roomform-grid">
                    <div className="roomform-group full-width">
                        <label>ชื่อผู้เช่า / ผู้จอง</label>
                        <input 
                            type="text" 
                            placeholder="ระบุชื่อ-นามสกุล (เว้นว่างไว้หากไม่มี)" 
                            value={form.tenant_name || ''} 
                            onChange={e => setForm({ ...form, tenant_name: e.target.value })} 
                        />
                    </div>

                    <div className="roomform-group">
                        <label>รหัสนิสิต</label>
                        <input 
                            type="text" 
                            placeholder="เช่น 66010024" 
                            value={form.student_id || ''} 
                            onChange={e => setForm({ ...form, student_id: e.target.value })} 
                        />
                    </div>

                    <div className="roomform-group">
                        <label>เบอร์โทรศัพท์ติดต่อ</label>
                        <input 
                            type="text" 
                            placeholder="เช่น 081-234-5678" 
                            value={form.tenant_phone || ''} 
                            onChange={e => setForm({ ...form, tenant_phone: e.target.value })} 
                        />
                    </div>
                </div>

                <div className="roomform-section-title">🖼️ ข้อมูลเพิ่มเติมและรูปภาพ</div>
                
                <div className="roomform-grid">
                    <div className="roomform-group full-width">
                        <label>ลิงก์รูปภาพห้องพัก (URL)</label>
                        <input 
                            type="text" 
                            placeholder="https://..." 
                            value={form.image_url || ''} 
                            onChange={e => setForm({ ...form, image_url: e.target.value })} 
                        />
                    </div>

                    <div className="roomform-group full-width">
                        <label>รายละเอียดและสิ่งอำนวยความสะดวก</label>
                        <textarea 
                            rows="4" 
                            value={form.details || ''} 
                            onChange={e => setForm({ ...form, details: e.target.value })} 
                        />
                    </div>
                </div>

                <div className="roomform-actions">
                    <Link to="/admin" className="btn-cancel-room">ยกเลิก</Link>
                    <button type="submit" className="btn-save-room">💾 บันทึกการแก้ไข</button>
                </div>
            </form>
        </div>
    );
}