import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

export default function HomeScreen() {
    return (
        <div style={{ textAlign: 'center', padding: '50px 20px', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '32px', color: '#1e3a8a', marginBottom: '16px' }}>ยินดีต้อนรับสู่ หอพักนักศึกษา KU Green Dorm</h1>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.6' }}>
                หอพักสะอาด บรรยากาศสงบ ปลอดภัย ใกล้มหาวิทยาลัย พร้อมสิ่งอำนวยความสะดวกครบครัน สัญญาเช่ารายเทอมและรายปี
            </p>
            <Link to="/rooms" style={{ background: '#2563eb', color: '#fff', padding: '12px 28px', borderRadius: '24px', textDecoration: 'none', fontWeight: 'bold' }}>
                ค้นหาห้องพักว่างตอนนี้ →
            </Link>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '900px', margin: '60px auto 0' }}>
                <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3>📶 Free Wi-Fi</h3>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>อินเทอร์เน็ตความเร็วสูงทุกห้อง</p>
                </div>
                <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3>🛡️ ปลอดภัย 24 ชม.</h3>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>มี รปภ. และกล้อง CCTV</p>
                </div>
                <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3>🧺 ซักผ้าหยอดเหรียญ</h3>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>พร้อมเครื่องกดน้ำดื่ม</p>
                </div>
            </div>
        </div>
    );
}