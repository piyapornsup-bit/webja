import React, { useState } from 'react';
import './FaqScreen.css';

export default function FaqScreen() {
    // เก็บ index ของคำถามที่เปิดอยู่ (Accordion)
    const [openIndex, setOpenIndex] = useState(0);

    // ฟอร์มแจ้งเรื่อง
    const [contactForm, setContactForm] = useState({ name: '', room: '', topic: 'แจ้งซ่อม', message: '' });

    const faqs = [
        {
            q: "1. เวลาเปิด-ปิดประตูหอพัก และการเข้า-ออกยามวิกาล?",
            a: "ประตูรั้วใหญ่เปิด 05:00 น. และปิดเวลา 24:00 น. หากกลับหลังเที่ยงคืน สามารถใช้คีย์การ์ดแตะเข้าประตูเล็กด้านข้างได้ตลอด 24 ชั่วโมง โดยมี รปภ. ประจำจุดตรวจตลอดเวลา"
        },
        {
            q: "2. กำหนดชำระค่าห้อง ค่าน้ำ และค่าไฟวันไหน?",
            a: "บิลจะออกทุกวันที่ 28 ของเดือน และมีกำหนดชำระภายในวันที่ 1-5 ของเดือนถัดไป สามารถโอนผ่าน QR Code บัญชีหอพัก แล้วแนบสลิปผ่านระบบได้เลย"
        },
        {
            q: "3. อนุญาตให้เลี้ยงสัตว์หรือทำอาหารในห้องพักหรือไม่?",
            a: "ห้ามเลี้ยงสัตว์ทุกชนิดอย่างเด็ดขาด ส่วนการทำอาหาร อนุญาตให้ใช้เครื่องใช้ไฟฟ้า เช่น ไมโครเวฟ กาน้ำร้อน หม้อหุงข้าว แต่ไม่อนุญาตให้ใช้เตาแก๊สหรือเตาปิ้งย่างที่มีควันหนาทึบ"
        },
        {
            q: "4. อินเทอร์เน็ต Wi-Fi มีปัญหา หรือหลุดบ่อยต้องทำอย่างไร?",
            a: "ระบบรองรับ 1 บัญชีผู้ใช้ต่อ 2 อุปกรณ์ หากสัญญาณขัดข้องสามารถแจ้งรีเซ็ตเราเตอร์ประจำชั้นผ่านฟอร์มแจ้งเรื่องด้านล่าง หรือโทรแจ้งฝ่ายไอทีหอพักได้ทันที"
        },
        {
            q: "5. สัญญาเช่าขั้นต่ำ และเงื่อนไขการย้ายออก?",
            a: "สัญญาเช่าขั้นต่ำ 1 ภาคการศึกษา (4 เดือน) หรือสัญญารายปี หากต้องการย้ายออก ต้องแจ้งล่วงหน้าอย่างน้อย 30 วัน เพื่อทำการนัดตรวจห้องและโอนเงินประกันคืนเข้าบัญชี"
        }
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const handleSendContact = (e) => {
        e.preventDefault();
        alert(`ส่งเรื่อง "${contactForm.topic}" ของห้อง ${contactForm.room} สำเร็จแล้ว เจ้าหน้าที่จะดำเนินการตรวจสอบโดยเร็ว`);
        setContactForm({ name: '', room: '', topic: 'แจ้งซ่อม', message: '' });
    };

    return (
        <div className="faq-page-wrapper">
            <div className="faq-header-section">
                <h1>ศูนย์ช่วยเหลือและกฎระเบียบหอพัก</h1>
                <p>รวมทุกคำถามที่พบบ่อย ข้อปฏิบัติการพักอาศัย และช่องทางติดต่อฉุกเฉิน</p>
            </div>

            <div className="faq-main-layout">
                {/* ฝั่งซ้าย: Accordion FAQ */}
                <div className="faq-list-container">
                    <h3 className="section-title">คำถามที่พบบ่อย (FAQ)</h3>
                    {faqs.map((item, idx) => (
                        <div key={idx} className={`faq-card ${openIndex === idx ? 'active' : ''}`}>
                            <div className="faq-question-bar" onClick={() => toggleFaq(idx)}>
                                <span>{item.q}</span>
                                <span className="faq-arrow">{openIndex === idx ? '▲' : '▼'}</span>
                            </div>
                            {openIndex === idx && (
                                <div className="faq-answer-body">
                                    <p>{item.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ฝั่งขวา: ติดต่อฉุกเฉิน + ฟอร์มแจ้งเรื่อง */}
                <div className="faq-sidebar">
                    {/* การ์ดเบอร์ติดต่อฉุกเฉิน */}
                    <div className="contact-info-card">
                        <h4>ช่องทางติดต่อด่วน</h4>
                        <div className="contact-item">
                            <span>🏢 สำนักงานหอพัก:</span>
                            <strong>02-123-4567 (08:30 - 17:30 น.)</strong>
                        </div>
                        <div className="contact-item">
                            <span>🛡️ ป้อม รปภ. (24 ชม.):</span>
                            <strong style={{ color: '#dc2626' }}>089-111-2233</strong>
                        </div>
                        <div className="contact-item">
                            <span>💬 LINE Official:</span>
                            <strong style={{ color: '#16a34a' }}>@kugreendorm</strong>
                        </div>
                    </div>

                    {/* ฟอร์มแจ้งปัญหา */}
                    <div className="report-form-card">
                        <h4>แจ้งซ่อม / ติดต่อเจ้าหน้าที่</h4>
                        <form onSubmit={handleSendContact}>
                            <div className="form-row">
                                <input 
                                    type="text" 
                                    placeholder="ชื่อผู้แจ้ง" 
                                    required 
                                    value={contactForm.name}
                                    onChange={e => setContactForm({...contactForm, name: e.target.value})}
                                />
                                <input 
                                    type="text" 
                                    placeholder="เลขห้อง (เช่น 201)" 
                                    required 
                                    value={contactForm.room}
                                    onChange={e => setContactForm({...contactForm, room: e.target.value})}
                                />
                            </div>
                            <select 
                                value={contactForm.topic}
                                onChange={e => setContactForm({...contactForm, topic: e.target.value})}
                            >
                                <option value="แจ้งซ่อม">แจ้งซ่อม (แอร์, น้ำ, ไฟ)</option>
                                <option value="สอบถามบิล">สอบถามค่าห้อง / บิลน้ำไฟ</option>
                                <option value="ร้องเรียนเสียงดัง">ร้องเรียนเสียงดัง / ความไม่สะดวก</option>
                                <option value="อื่นๆ">เรื่องอื่น ๆ</option>
                            </select>
                            <textarea 
                                rows="3" 
                                placeholder="รายละเอียดเรื่องที่ต้องการแจ้ง..." 
                                required
                                value={contactForm.message}
                                onChange={e => setContactForm({...contactForm, message: e.target.value})}
                            ></textarea>
                            <button type="submit">ส่งเรื่องถึงเจ้าหน้าที่</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}