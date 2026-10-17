import React from 'react';
import './FaqScreen.css';

export default function FaqScreen() {
    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
            <h2>กฎระเบียบและคำถามที่พบบ่อย (FAQ)</h2>
            <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h4>1. หอพักเปิด-ปิดกี่โมง?</h4>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>ประตูใหญ่เปิด 05:00 น. ปิด 24:00 น. นอกเวลาดังกล่าวสามารถใช้คีย์การ์ดสแกนเข้า-ออกได้ตลอด 24 ชั่วโมง</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h4>2. สัญญาเช่าขั้นต่ำกี่เดือน?</h4>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>สัญญาเช่าขั้นต่ำ 1 ภาคการศึกษา (4 เดือน) หรือสัญญาแบบรายปี (12 เดือน)</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h4>3. ชำระค่าห้องวันไหน?</h4>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>ชำระทุกวันที่ 1-5 ของทุกเดือน ผ่านระบบโอนเงินของทางหอพัก</p>
                </div>
            </div>
        </div>
    );
}