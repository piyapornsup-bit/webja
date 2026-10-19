const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 1. READ ALL & FILTER
app.get('/api/rooms', (req, res) => {
    const { room_type, floor, status } = req.query;
    let sql = 'SELECT * FROM rooms WHERE 1=1';
    const params = [];

    // กรองเฉพาะเมื่อมีค่าจริงและไม่ใช่สตริงว่าง
    if (room_type && room_type.trim() !== '') {
        sql += ' AND room_type = ?';
        params.push(room_type);
    }
    if (floor && floor.toString().trim() !== '') {
        sql += ' AND floor = ?';
        params.push(floor);
    }
    if (status && status.trim() !== '') {
        sql += ' AND status = ?';
        params.push(status);
    }

    sql += ' ORDER BY room_number ASC';

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. READ ONE
app.get('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM rooms WHERE id = ?', [id], (err, results) => {
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
        status || 'available', 
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
    const { room_number, room_type, price, floor, status, details, tenant_name, tenant_phone, image_url } = req.body;
    
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
        res.json({ message: 'แก้ไขข้อมูลสำเร็จ' });
    });
});

// 5. UPDATE STATUS (จองห้อง)
app.patch('/api/rooms/:id/reserve', (req, res) => {
    const { id } = req.params;
    const { tenant_name, tenant_phone } = req.body;
    
    const sql = "UPDATE rooms SET status = 'reserved', tenant_name = ?, tenant_phone = ? WHERE id = ? AND status = 'available'";
    
    db.query(sql, [tenant_name || null, tenant_phone || null, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'ห้องพักไม่พร้อมให้จอง หรือถูกจองไปแล้ว' });
        }
        res.json({ message: 'จองห้องสำเร็จ' });
    });
});

// 6. DELETE
app.delete('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM rooms WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'ลบห้องพักสำเร็จ' });
    });
});

app.listen(PORT, () => {
    console.log(`Server API is running on http://localhost:${PORT}`);
});