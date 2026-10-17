import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{ background: '#2563eb', padding: '12px 24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
                🏢 KU Green Dorm
            </Link>
            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', alignItems: 'center' }}>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>หน้าแรก</Link>
                <Link to="/rooms" style={{ color: '#fff', textDecoration: 'none' }}>รายการห้องพัก</Link>
                <Link to="/calculator" style={{ color: '#fff', textDecoration: 'none' }}>คำนวณค่าน้ำไฟ</Link>
                <Link to="/faq" style={{ color: '#fff', textDecoration: 'none' }}>กฎระเบียบ</Link>
                <Link to="/admin" style={{ background: '#1e3a8a', color: '#fff', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
                    จัดการระบบ (Admin)
                </Link>
            </div>
        </nav>
    );
}