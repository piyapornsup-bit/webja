import React, { useState } from 'react';
import './CalculatorScreen.css';

export default function CalculatorScreen() {
    // ข้อมูลห้องและการคำนวณ
    const [roomNumber, setRoomNumber] = useState('201');
    const [roomType, setRoomType] = useState('air');
    const [rent, setRent] = useState(3800);

    // มิเตอร์ไฟฟ้า (ครั้งก่อน - ครั้งนี้)
    const [prevElec, setPrevElec] = useState(1240);
    const [currElec, setCurrElec] = useState(1365);

    // มิเตอร์น้ำประปา (ครั้งก่อน - ครั้งนี้)
    const [prevWater, setPrevWater] = useState(412);
    const [currWater, setCurrWater] = useState(418);

    // ค่าบริการเพิ่มเติม
    const [parkingFee, setParkingFee] = useState(0);
    const [wifiPremium, setWifiPremium] = useState(0);

    // คำนวณหน่วยที่ใช้
    const elecUnits = Math.max(0, currElec - prevElec);
    const waterUnits = Math.max(0, currWater - prevWater);

    // คำนวณค่าใช้จ่าย
    const elecPrice = elecUnits * 8; // 8 บาท/หน่วย
    const waterPrice = waterUnits * 18; // 18 บาท/หน่วย
    const totalExtra = Number(parkingFee) + Number(wifiPremium);
    const grandTotal = Number(rent) + elecPrice + waterPrice + totalExtra;

    // วันที่ออกบิลจำลอง
    const today = new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="calc-page-wrapper">
            <div className="calc-header">
                <h1>ระบบจำลองการคำนวณบิลค่าน้ำ-ค่าไฟ</h1>
                <p>คำนวณตามหน่วยมิเตอร์จริง พร้อมจำลองใบแจ้งชำระค่าเช่ารายเดือน</p>
            </div>

            <div className="calc-grid-layout">
                {/* ฝั่งซ้าย: ฟอร์มกรอกเลขมิเตอร์ */}
                <div className="calc-form-card">
                    <h3 className="card-title">📝 บันทึกข้อมูลและเลขมิเตอร์</h3>

                    <div className="form-group-row">
                        <div className="form-field">
                            <label>หมายเลขห้องพัก</label>
                            <input 
                                type="text" 
                                value={roomNumber} 
                                onChange={e => setRoomNumber(e.target.value)}
                                placeholder="เช่น 201"
                            />
                        </div>
                        <div className="form-field">
                            <label>ค่าเช่าห้องพัก (บาท)</label>
                            <input 
                                type="number" 
                                value={rent} 
                                onChange={e => setRent(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* กล่องไฟฟ้า */}
                    <div className="meter-box elec-box">
                        <div className="meter-header">
                            <span>⚡ ไฟฟ้า (8 บาท / หน่วย)</span>
                            <strong>ใช้ไป: {elecUnits} หน่วย</strong>
                        </div>
                        <div className="form-group-row">
                            <div className="form-field">
                                <label>เลขมิเตอร์ครั้งก่อน</label>
                                <input 
                                    type="number" 
                                    value={prevElec} 
                                    onChange={e => setPrevElec(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-field">
                                <label>เลขมิเตอร์ครั้งนี้</label>
                                <input 
                                    type="number" 
                                    value={currElec} 
                                    onChange={e => setCurrElec(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* กล่องน้ำประปา */}
                    <div className="meter-box water-box">
                        <div className="meter-header">
                            <span>💧 น้ำประปา (18 บาท / หน่วย)</span>
                            <strong>ใช้ไป: {waterUnits} หน่วย</strong>
                        </div>
                        <div className="form-group-row">
                            <div className="form-field">
                                <label>เลขมิเตอร์ครั้งก่อน</label>
                                <input 
                                    type="number" 
                                    value={prevWater} 
                                    onChange={e => setPrevWater(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-field">
                                <label>เลขมิเตอร์ครั้งนี้</label>
                                <input 
                                    type="number" 
                                    value={currWater} 
                                    onChange={e => setCurrWater(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* บริการเพิ่มเติม */}
                    <div className="extra-service-box">
                        <label className="extra-label">บริการเพิ่มเติม</label>
                        <div className="form-group-row">
                            <div className="form-field">
                                <label>ที่จอดรถยนต์ (+300 บ.)</label>
                                <select value={parkingFee} onChange={e => setParkingFee(Number(e.target.value))}>
                                    <option value={0}>ไม่ใช้งาน (0 บาท)</option>
                                    <option value={300}>จอดรถยนต์ (300 บาท/ด.)</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>เน็ตความเร็วสูง (+150 บ.)</label>
                                <select value={wifiPremium} onChange={e => setWifiPremium(Number(e.target.value))}>
                                    <option value={0}>Wi-Fi ฟรีพื้นฐาน</option>
                                    <option value={150}>Super Speed 500Mbps (150 บาท/ด.)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ฝั่งขวา: จำลองใบแจ้งหนี้ (Invoice Preview) */}
                <div className="invoice-preview-card">
                    <div className="invoice-header">
                        <div>
                            <h2>KU Green Dorm</h2>
                            <p>ใบแจ้งค่าเช่าและค่าสาธารณูปโภค</p>
                        </div>
                        <div className="invoice-room-tag">
                            ห้อง {roomNumber}
                        </div>
                    </div>

                    <div className="invoice-meta">
                        <span>วันที่ออกเอกสาร: {today}</span>
                        <span>รอบบิลประจำเดือน</span>
                    </div>

                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>รายการ</th>
                                <th style={{ textAlign: 'center' }}>จำนวนหน่วย</th>
                                <th style={{ textAlign: 'right' }}>จำนวนเงิน (บาท)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ค่าเช่าห้องพักประจำเดือน</td>
                                <td style={{ textAlign: 'center' }}>1 เดือน</td>
                                <td style={{ textAlign: 'right' }}>฿{Number(rent).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>ค่าไฟฟ้า ({currElec} - {prevElec})</td>
                                <td style={{ textAlign: 'center' }}>{elecUnits} หน่วย</td>
                                <td style={{ textAlign: 'right' }}>฿{elecPrice.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>ค่าน้ำประปา ({currWater} - {prevWater})</td>
                                <td style={{ textAlign: 'center' }}>{waterUnits} หน่วย</td>
                                <td style={{ textAlign: 'right' }}>฿{waterPrice.toLocaleString()}</td>
                            </tr>
                            {parkingFee > 0 && (
                                <tr>
                                    <td>ค่าที่จอดรถยนต์</td>
                                    <td style={{ textAlign: 'center' }}>1 คัน</td>
                                    <td style={{ textAlign: 'right' }}>฿{parkingFee.toLocaleString()}</td>
                                </tr>
                            )}
                            {wifiPremium > 0 && (
                                <tr>
                                    <td>ค่าบริการ Super Speed Wi-Fi</td>
                                    <td style={{ textAlign: 'center' }}>1 บัญชี</td>
                                    <td style={{ textAlign: 'right' }}>฿{wifiPremium.toLocaleString()}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="2">ยอดรวมสุทธิที่ต้องชำระ</th>
                                <th style={{ textAlign: 'right', color: '#15803d', fontSize: '20px' }}>
                                    ฿{grandTotal.toLocaleString()}
                                </th>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="invoice-footer-note">
                        <p>📌 กำหนดชำระภายในวันที่ 1 - 5 ของเดือน</p>
                        <p>ชำระผ่านพร้อมเพย์ / โอนเข้าบัญชีธนาคารหอพัก</p>
                    </div>

                    <button onClick={handlePrint} className="btn-print-bill">
                        🖨️ พิมพ์ใบแจ้งหนี้ / สั่งพิมพ์
                    </button>
                </div>
            </div>

            {/* การ์ดความรู้เสริมด้านล่าง */}
            <div className="calc-tips-grid">
                <div className="tip-card">
                    <h4>💡 ทริกประหยัดไฟ</h4>
                    <p>ตั้งอุณหภูมิแอร์ 26°C ร่วมกับการเปิดพัดลม ช่วยประหยัดค่าไฟได้ 10-15% ต่อเดือน</p>
                </div>
                <div className="tip-card">
                    <h4>📅 กำหนดตัดยอดบิล</h4>
                    <p>เจ้าหน้าที่จะจดมิเตอร์ทุกวันที่ 27 ของเดือน และอัปเดตบิลเข้าสู่ระบบในวันที่ 28</p>
                </div>
                <div className="tip-card">
                    <h4>⚠️ ค่าปรับล่าช้า</h4>
                    <p>ชำระเกินวันที่ 5 ของเดือน มีค่าปรับวันละ 50 บาท หากติดขัดสามารถแจ้งผ่อนผันได้</p>
                </div>
            </div>
        </div>
    );
}