import React, { useState } from 'react';
import './CalculatorScreen.css';

export default function CalculatorScreen() {
    const [rent, setRent] = useState(3800);
    const [elecUnits, setElecUnits] = useState(100);
    const [waterUnits, setWaterUnits] = useState(5);

    const elecPrice = elecUnits * 8;
    const waterPrice = waterUnits * 18;
    const grandTotal = Number(rent) + elecPrice + waterPrice;

    return (
        <div style={{ maxWidth: '480px', margin: '40px auto', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
            <h2>โปรแกรมคำนวณค่าน้ำ-ค่าไฟ</h2>
            <p style={{ fontSize: '12px', color: '#64748b' }}>* ค่าไฟ 8 บาท/หน่วย • ค่าน้ำ 18 บาท/หน่วย</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                <div>
                    <label style={{ fontSize: '13px' }}>ค่าเช่าห้อง (บาท)</label>
                    <input type="number" value={rent} onChange={e => setRent(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <div>
                    <label style={{ fontSize: '13px' }}>หน่วยไฟฟ้าที่ใช้ (หน่วย)</label>
                    <input type="number" value={elecUnits} onChange={e => setElecUnits(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <div>
                    <label style={{ fontSize: '13px' }}>หน่วยน้ำที่ใช้ (หน่วย)</label>
                    <input type="number" value={waterUnits} onChange={e => setWaterUnits(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: '#eff6ff', borderRadius: '8px' }}>
                <p style={{ margin: '4px 0' }}>ค่าไฟ: ฿{elecPrice.toLocaleString()}</p>
                <p style={{ margin: '4px 0' }}>ค่าน้ำ: ฿{waterPrice.toLocaleString()}</p>
                <hr style={{ margin: '10px 0', borderColor: '#bfdbfe' }} />
                <h3 style={{ color: '#1e3a8a', margin: 0 }}>ยอดรวมสุทธิ: ฿{grandTotal.toLocaleString()}</h3>
            </div>
        </div>
    );
}