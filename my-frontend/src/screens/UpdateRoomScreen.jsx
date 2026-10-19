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
        details: '',
        tenant_name: '',
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
            // เด้งกลับไปหน้ารวมห้องทันที พร้อมส่งข้อความแจ้งเตือนไปด้วย
            navigate('/admin', { 
                state: { successMessage: `แก้ไขข้อมูลห้อง ${form.room_number} สำเร็จเรียบร้อยแล้ว` } 
            });
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    return (
        <div className="roomform-container">
            <h2 className="roomform-title">แก้ไขข้อมูลห้องพัก (Update)</h2>
            <form onSubmit={handleSubmit}>
                <div className="roomform-group">
                    <label>หมายเลขห้องพัก *</label>
                    <input 
                        type="text" 
                        required 
                        value={form.room_number} 
                        onChange={e => setForm({...form, room_number: e.target.value})} 
                    />
                </div>

                <div className="roomform-group">
                    <label>ประเภทห้องพัก</label>
                    <select value={form.room_type} onChange={e => setForm({...form, room_type: e.target.value})}>
                        <option value="fan">ห้องพัดลม</option>
                        <option value="air">ห้องปรับอากาศ (แอร์)</option>
                    </select>
                </div>

                <div className="roomform-group">
                    <label>ชั้น</label>
                    <input 
                        type="number" 
                        required 
                        value={form.floor} 
                        onChange={e => setForm({...form, floor: Number(e.target.value)})} 
                    />
                </div>

                <div className="roomform-group">
                    <label>ราคาค่าเช่า (บาท/เดือน) *</label>
                    <input 
                        type="number" 
                        required 
                        value={form.price} 
                        onChange={e => setForm({...form, price: Number(e.target.value)})} 
                    />
                </div>

                <div className="roomform-group">
                    <label>สถานะห้องพัก</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                        <option value="available">🟢 ห้องว่าง (Available)</option>
                        <option value="reserved">🔴 มีผู้เช่า / จองแล้ว (Reserved)</option>
                        <option value="maintenance">🟡 ปิดปรับปรุง (Maintenance)</option>
                    </select>
                </div>

                <div className="roomform-group">
                    <label>ชื่อผู้เช่า / ผู้จอง (ถ้ามี)</label>
                    <input 
                        type="text" 
                        placeholder="เช่น นายสมชาย ใจดี" 
                        value={form.tenant_name || ''} 
                        onChange={e => setForm({...form, tenant_name: e.target.value})} 
                    />
                </div>

                <div className="roomform-group">
                    <label>เบอร์โทรศัพท์ผู้เช่า</label>
                    <input 
                        type="text" 
                        placeholder="เช่น 081-234-5678" 
                        value={form.tenant_phone || ''} 
                        onChange={e => setForm({...form, tenant_phone: e.target.value})} 
                    />
                </div>

                <div className="roomform-group">
                    <label>ลิงก์รูปภาพห้องพัก (URL)</label>
                    <input 
                        type="text" 
                        placeholder="https://..." 
                        value={form.image_url || ''} 
                        onChange={e => setForm({...form, image_url: e.target.value})} 
                    />
                </div>

                <div className="roomform-group">
                    <label>รายละเอียดและสิ่งอำนวยความสะดวก</label>
                    <textarea 
                        rows="3" 
                        value={form.details || ''} 
                        onChange={e => setForm({...form, details: e.target.value})} 
                    />
                </div>

                <button type="submit" className="btn-save-room">
                    บันทึกการแก้ไข
                </button>
            </form>
        </div>
    );
}