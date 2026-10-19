import React, { useState } from 'react';
import './FaqScreen.css';

export default function FaqScreen() {
    // จัดการการเปิด-ปิด Accordion
    const [openIndex, setOpenIndex] = useState(0);

    // State สำหรับฟอร์มแจ้งเรื่อง
    const [formData, setFormData] = useState({
        name: '',
        room: '',
        topic: 'แจ้งอุปกรณ์ชำรุด / ซ่อมแซม',
        details: ''
    });

    // State สำหรับกล่อง Toast แจ้งเตือน
    const [toastMessage, setToastMessage] = useState('');

    const faqs = [
        {
            q: '1. เวลาเปิด-ปิดประตูหอพัก และการเข้า-ออกยามวิกาล',
            a: 'ประตูรั้วใหญ่เปิด 05:00 น. และปิดเวลา 24:00 น. หากกลับหลังเที่ยงคืน สามารถใช้คีย์การ์ดสแกนเข้าประตูเล็กด้านข้างได้ตลอด 24 ชั่วโมง โดยมี รปภ. ประจำจุดตรวจตลอดเวลา'
        },
        {
            q: '2. กำหนดชำระค่าห้อง ค่าน้ำ และค่าไฟวันไหน?',
            a: 'ระบบจะออกใบแจ้งหนี้ทุกวันที่ 25 ของเดือน และเปิดให้ชำระได้ถึงวันที่ 5 ของเดือนถัดไป หากเกินกำหนดจะมีค่าปรับวันละ 50 บาท'
        },
        {
            q: '3. อนุญาตให้เลี้ยงสัตว์หรือทำอาหารในห้องพักหรือไม่?',
            a: 'ไม่อนุญาตให้เลี้ยงสัตว์เลี้ยงทุกชนิดเด็ดขาด สำหรับการทำอาหาร อนุญาตให้ใช้เตาไฟฟ้า ไมโครเวฟ หรือหม้อทอดไร้น้ำมันได้ แต่ห้ามใช้เตาแก๊สกระป๋องหรือถังแก๊สทุกประเภท'
        },
        {
            q: '4. อินเทอร์เน็ต Wi-Fi มีปัญหา หรือหลุดบ่อยต้องทำอย่างไร?',
            a: 'สามารถแจ้งหมายเลขห้องและจุดที่สัญญาณอ่อนผ่านแบบฟอร์มด้านข้างนี้ หรือติดต่อช่างเทคนิคประจำอาคารเพื่อรีเซ็ตเราเตอร์ประจำชั้นได้ทันที'
        },
        {
            q: '5. สัญญาเช่าขั้นต่ำ และเงื่อนไขการย้ายออก?',
            a: 'สัญญาเช่าขั้นต่ำ 4 เดือน หากต้องการย้ายออกต้องแจ้งล่วงหน้าอย่างน้อย 30 วัน เพื่อทำการนัดตรวจสภาพห้องและคืนเงินประกันสัญญา'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.room || !formData.details) {
            alert('กรุณากรอกหมายเลขห้องและรายละเอียดให้ครบถ้วน');
            return;
        }

        // แสดง Toast แจ้งเตือนแทน alert() แบบเดิม
        setToastMessage(`ส่งเรื่อง "${formData.topic}" ของห้อง ${formData.room} สำเร็จแล้ว เจ้าหน้าที่จะรีบดำเนินการ`);

        // ล้างฟอร์ม
        setFormData({
            name: '',
            room: '',
            topic: 'แจ้งอุปกรณ์ชำรุด / ซ่อมแซม',
            details: ''
        });

        // ซ่อน Toast อัตโนมัติหลังผ่านไป 4 วินาที
        setTimeout(() => {
            setToastMessage('');
        }, 4000);
    };

    return (
        <div style={{ maxWidth: '1150px', margin: '30px auto 60px', padding: '0 16px', fontFamily: 'sans-serif', position: 'relative' }}>
            
            {/* กล่อง Toast แจ้งเตือนการ์ดขาวขอบเขียว ลอยมุมขวาบน สไตล์เดียวกับ Dashboard */}
            {toastMessage && (
                <div style={{
                    position: 'fixed',
                    top: '85px',
                    right: '25px',
                    backgroundColor: '#ffffff',
                    borderLeft: '6px solid #16a34a',
                    borderTop: '1px solid #e2e8f0',
                    borderRight: '1px solid #e2e8f0',
                    borderBottom: '1px solid #e2e8f0',
                    padding: '14px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 999999,
                    maxWidth: '420px'
                }}>
                    <span style={{ fontSize: '22px' }}>✅</span>
                    <div>
                        <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: 'bold' }}>ส่งเรื่องถึงเจ้าหน้าที่เรียบร้อย</div>
                        <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', marginTop: '2px', lineHeight: '1.4' }}>
                            {toastMessage}
                        </div>
                    </div>
                </div>
            )}

            {/* Layout แบ่ง 2 คอลัมน์ (ซ้าย: คำถามพบบ่อย / ขวา: แบบฟอร์มแจ้งซ่อมและติดต่อ) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', alignItems: 'start' }}>
                
                {/* ฝั่งซ้าย: Accordion กฎระเบียบและ FAQ */}
                <div>
                    <h2 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '20px' }}>คำถามที่พบบ่อยและกฎระเบียบหอพัก</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div 
                                    key={index} 
                                    style={{
                                        background: '#ffffff',
                                        borderRadius: '12px',
                                        border: isOpen ? '1px solid #16a34a' : '1px solid #e2e8f0',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div 
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        style={{
                                            padding: '16px 20px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            background: isOpen ? '#f0fdf4' : '#ffffff',
                                            fontWeight: 'bold',
                                            color: isOpen ? '#15803d' : '#1e293b',
                                            fontSize: '15px'
                                        }}
                                    >
                                        <span>{faq.q}</span>
                                        <span style={{ fontSize: '14px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                                            ▼
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <div style={{ padding: '16px 20px', color: '#475569', fontSize: '14px', lineHeight: '1.6', borderTop: '1px solid #f1f5f9' }}>
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ฝั่งขวา: ข้อมูลติดต่อด่วน + แบบฟอร์มแจ้งเรื่อง */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* การ์ดติดต่อด่วน */}
                    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', fontSize: '16px' }}>ช่องทางติดต่อด่วน</h4>
                        <p style={{ margin: '6px 0', fontSize: '14px', color: '#475569' }}>
                            🏢 <strong>สำนักงานหอพัก:</strong> อาคาร A ชั้น 1 (เวลา 08:30 - 17:30 น.)
                        </p>
                        <p style={{ margin: '6px 0', fontSize: '14px', color: '#475569' }}>
                            📞 <strong>เบอร์ฉุกเฉิน (24 ชม.):</strong> <span style={{ color: '#dc2626', fontWeight: 'bold' }}>089-111-2233</span>
                        </p>
                        <p style={{ margin: '6px 0', fontSize: '14px', color: '#475569' }}>
                            💬 <strong>LINE Official:</strong> <span style={{ color: '#15803d', fontWeight: 'bold' }}>@kugreendorm</span>
                        </p>
                    </div>

                    {/* การ์ดแบบฟอร์มแจ้งซ่อม / ร้องเรียน */}
                    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ margin: '0 0 16px 0', color: '#0f172a', fontSize: '18px' }}>แจ้งซ่อม / ติดต่อเจ้าหน้าที่</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input 
                                    type="text" 
                                    placeholder="ชื่อผู้แจ้ง" 
                                    value={formData.name} 
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#fff', color: '#0f172a' }}
                                />
                                <input 
                                    type="text" 
                                    placeholder="เลขห้อง (เช่น 501)" 
                                    value={formData.room} 
                                    onChange={e => setFormData({ ...formData, room: e.target.value })}
                                    required
                                    style={{ width: '130px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#fff', color: '#0f172a' }}
                                />
                            </div>

                            <select 
                                value={formData.topic} 
                                onChange={e => setFormData({ ...formData, topic: e.target.value })}
                                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#fff', color: '#0f172a' }}
                            >
                                <option value="แจ้งอุปกรณ์ชำรุด / ซ่อมแซม">แจ้งอุปกรณ์ชำรุด / ซ่อมแซม</option>
                                <option value="แจ้งปัญหาสัญญาณอินเทอร์เน็ต Wi-Fi">แจ้งปัญหาสัญญาณอินเทอร์เน็ต Wi-Fi</option>
                                <option value="ร้องเรียนเสียงดัง / ความไม่สะดวก">ร้องเรียนเสียงดัง / ความไม่สะดวก</option>
                                <option value="สอบถามเรื่องค่าเช่า / บิลน้ำไฟ">สอบถามเรื่องค่าเช่า / บิลน้ำไฟ</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>

                            <textarea 
                                rows="3" 
                                placeholder="ระบุรายละเอียดปัญหาที่ต้องการแจ้ง..." 
                                value={formData.details} 
                                onChange={e => setFormData({ ...formData, details: e.target.value })}
                                required
                                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', resize: 'vertical', background: '#fff', color: '#0f172a' }}
                            />

                            <button 
                                type="submit" 
                                style={{
                                    background: '#15803d',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    cursor: 'pointer'
                                }}
                            >
                                ส่งเรื่องถึงเจ้าหน้าที่
                            </button>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    );
}