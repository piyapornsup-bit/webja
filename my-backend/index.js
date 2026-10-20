const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 1. READ ALL & FILTER (ดึงข้อมูลห้อง พร้อมรหัสนิสิตล่าสุดสำหรับแสดงใน Admin Dashboard)
app.get('/api/rooms', (req, res) => {
    const { room_type, floor, status } = req.query;
    let sql = `
        SELECT 
            r.*, 
            (SELECT b.student_id 
             FROM bookings b 
             WHERE b.room_id = r.id 
             ORDER BY b.id DESC LIMIT 1) AS student_id
        FROM rooms r 
        WHERE 1=1
    `;
    const params = [];

    if (room_type && room_type.trim() !== '') {
        sql += ' AND r.room_type = ?';
        params.push(room_type);
    }
    if (floor && floor.toString().trim() !== '') {
        sql += ' AND r.floor = ?';
        params.push(floor);
    }
    if (status && status.trim() !== '') {
        // รองรับการกรองทั้งค่าไทยและอังกฤษ
        if (status === 'available' || status === 'ว่าง') {
            sql += " AND (r.status = 'ว่าง' OR r.status = 'available')";
        } else if (status === 'reserved' || status === 'จองแล้ว') {
            sql += " AND (r.status = 'จองแล้ว' OR r.status = 'reserved')";
        } else if (status === 'occupied' || status === 'มีผู้เช่า') {
            sql += " AND (r.status = 'มีผู้เช่า' OR r.status = 'occupied')";
        } else if (status === 'maintenance' || status === 'ปิดปรับปรุง') {
            sql += " AND (r.status = 'ปิดปรับปรุง' OR r.status = 'maintenance')";
        } else {
            sql += ' AND r.status = ?';
            params.push(status);
        }
    }

    sql += ' ORDER BY r.room_number ASC';

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. READ ONE (ดึงข้อมูลห้อง พร้อมรหัสนิสิตจาก bookings)
app.get('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT 
            r.*, 
            (SELECT b.student_id 
             FROM bookings b 
             WHERE b.room_id = r.id 
             ORDER BY b.id DESC LIMIT 1) AS student_id
        FROM rooms r 
        WHERE r.id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'ไม่พบห้องพัก' });
        res.json(results[0]);
    });
});

// 3. CREATE
app.post('/api/rooms', (req, res) => {
    const { room_number, room_type, price, floor, status, details, tenant_name, tenant_phone, image_url } = req.body;
    const sql = 'INSERT INTO rooms (room_number, room_type, price, floor, status, details, tenant_name, tenant_phone, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [
        room_number, 
        room_type, 
        price, 
        floor, 
        status || 'ว่าง', 
        details, 
        tenant_name || null, 
        tenant_phone || null,
        image_url || null
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'เพิ่มห้องพักสำเร็จ', id: result.insertId });
    });
});

// 4. UPDATE
app.put('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    const { room_number, room_type, price, floor, status, details, tenant_name, tenant_phone, image_url, student_id } = req.body;
    
    const sql = `UPDATE rooms SET 
        room_number = ?, 
        room_type = ?, 
        price = ?, 
        floor = ?, 
        status = ?, 
        details = ?, 
        tenant_name = ?, 
        tenant_phone = ?, 
        image_url = ? 
        WHERE id = ?`;

    db.query(sql, [
        room_number, 
        room_type, 
        price, 
        floor, 
        status, 
        details, 
        tenant_name || null, 
        tenant_phone || null, 
        image_url || null, 
        id
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        // จัดการตาราง bookings ให้ซิงก์กัน (เช็กทั้งสถานะ "ว่าง" และ "available")
        const isNotAvailable = status !== 'ว่าง' && status !== 'available';
        if (tenant_name && tenant_name.trim() !== '' && isNotAvailable) {
            // กรณีมีชื่อผู้เช่า/ผู้จอง: เช็กว่ามีใน bookings หรือยัง
            const checkSql = 'SELECT id FROM bookings WHERE room_id = ? ORDER BY id DESC LIMIT 1';
            db.query(checkSql, [id], (errCheck, rows) => {
                if (errCheck) return console.error('Check error:', errCheck);

                if (rows.length > 0) {
                    // อัปเดตข้อมูลเดิม
                    const updateBookingSql = `
                        UPDATE bookings 
                        SET student_name = ?, student_id = ?, phone = ? 
                        WHERE id = ?
                    `;
                    db.query(updateBookingSql, [tenant_name, student_id || '-', tenant_phone || '-', rows[0].id]);
                } else {
                    // เพิ่มรายการใหม่
                    const insertBookingSql = `
                        INSERT INTO bookings (room_id, student_name, student_id, phone, booking_status) 
                        VALUES (?, ?, ?, ?, 'confirmed')
                    `;
                    db.query(insertBookingSql, [id, tenant_name, student_id || '-', tenant_phone || '-']);
                }
            });
        } else {
            // กรณีลบชื่อออก หรือเปลี่ยนสถานะกลับเป็นห้องว่าง: ลบรายการใน bookings ของห้องนี้ออก
            const deleteBookingSql = 'DELETE FROM bookings WHERE room_id = ?';
            db.query(deleteBookingSql, [id], (errDelete) => {
                if (errDelete) console.error('Delete booking error:', errDelete);
            });
        }

        res.json({ message: 'แก้ไขข้อมูลสำเร็จ' });
    });
});

// 5. RESERVE ROOM (จองห้องพักจากฝั่งนิสิต)
app.patch('/api/rooms/:id/reserve', (req, res) => {
    const { id } = req.params;
    const { tenant_name, tenant_phone, student_id } = req.body;

    // บันทึกสถานะห้องเป็น 'จองแล้ว' เมื่อห้องเดิมมีสถานะเป็น 'ว่าง' หรือ 'available'
    const updateRoomSql = "UPDATE rooms SET status = 'จองแล้ว', tenant_name = ?, tenant_phone = ? WHERE id = ? AND (status = 'ว่าง' OR status = 'available')";

    db.query(updateRoomSql, [tenant_name || null, tenant_phone || null, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'ห้องพักไม่พร้อมให้จอง หรือถูกจองไปแล้ว' });
        }

        const insertBookingSql = `
            INSERT INTO bookings (room_id, student_name, student_id, phone, booking_status) 
            VALUES (?, ?, ?, ?, 'confirmed')
        `;
        db.query(insertBookingSql, [id, tenant_name, student_id || '-', tenant_phone || '-'], (errBooking) => {
            if (errBooking) console.error('Booking sync error:', errBooking);
        });

        res.json({ message: 'จองห้องพักสำเร็จ' });
    });
});

// 6. DELETE
app.delete('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    // ลบรายการใน bookings ก่อนเพื่อความสะอาด
    db.query('DELETE FROM bookings WHERE room_id = ?', [id], () => {
        db.query('DELETE FROM rooms WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'ลบห้องพักสำเร็จ' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server API is running on http://localhost:${PORT}`);
});