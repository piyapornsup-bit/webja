import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reserveRoom } from '../api/roomApi';

export default function BookingScreen() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            // ส่งข้อมูลโดยแปลงชื่อ field ให้ตรงกับ Backend
        await reserveRoom(id, {
        tenant_name: formData.name,
        tenant_phone: formData.phone,
        student_id: formData.studentId // ส่งรหัสนิสิตมาบันทึกลงตาราง bookings ด้วย
        });

            // จองสำเร็จ นำทางกลับไปหน้ารายการห้องพักพร้อมส่งข้อความแจ้งเตือน
            navigate('/rooms', { 
                state: { successMessage: `จองห้องพักสำเร็จเรียบร้อยแล้ว` } 
            });
        } catch (err) {
            console.error('Booking failed:', err);
            setErrorMsg(err.message || 'ไม่สามารถทำการจองได้ กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '480px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '24px', fontWeight: 'bold' }}>แบบฟอร์มยืนยันการจองห้อง</h2>

            {errorMsg && (
                <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', border: '1px solid #fecaca' }}>
                    ⚠️ {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '6px' }}>ชื่อ-นามสกุล *</label>
                    <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '6px' }}>รหัสนิสิต *</label>
                    <input 
                        type="text" 
                        required 
                        value={formData.studentId} 
                        onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '6px' }}>เบอร์โทรศัพท์ *</label>
                    <input 
                        type="text" 
                        required 
                        value={formData.phone} 
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '10px',
                        backgroundColor: '#15803d',
                        color: '#fff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'กำลังบันทึกการจอง...' : 'ยืนยันการจองห้องพัก'}
                </button>
            </form>
        </div>
    );
}