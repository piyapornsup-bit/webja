const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // ใส่รหัสผ่านของ MySQL เครื่องคุณ (ถ้าไม่มีให้เว้นว่างไว้แบบนี้)
    database: 'dorm_db'
});

connection.connect((err) => {
    if (err) {
        console.error('❌ เชื่อมต่อ MySQL ไม่สำเร็จ:', err.message);
        return;
    }
    console.log('✅ เชื่อมต่อฐานข้อมูล dorm_db สำเร็จแล้ว');
});

module.exports = connection;