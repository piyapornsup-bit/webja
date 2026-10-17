CREATE DATABASE IF NOT EXISTS dorm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dorm_db;

CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    room_type ENUM('fan', 'air') NOT NULL DEFAULT 'fan',
    price DECIMAL(10, 2) NOT NULL,
    floor INT NOT NULL,
    status ENUM('available', 'reserved', 'maintenance') NOT NULL DEFAULT 'available',
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO rooms (room_number, room_type, price, floor, status, details) VALUES
('101', 'fan', 2500.00, 1, 'available', 'เตียงเดี่ยว, ตู้เสื้อผ้า, พัดลมติดผนัง, โต๊ะอ่านหนังสือ'),
('102', 'fan', 2500.00, 1, 'reserved', 'เตียงเดี่ยว, ตู้เสื้อผ้า, พัดลมติดผนัง'),
('201', 'air', 3800.00, 2, 'available', 'เตียงคู่, เครื่องปรับอากาศ, เครื่องทำน้ำอุ่น, โต๊ะอ่านหนังสือ'),
('202', 'air', 3800.00, 2, 'available', 'เตียงคู่, เครื่องปรับอากาศ, เครื่องทำน้ำอุ่น, ระเบียงรับลม'),
('203', 'air', 4000.00, 2, 'maintenance', 'แอร์กำลังรอเปลี่ยนอะไหล่'),
('301', 'air', 4200.00, 3, 'available', 'ห้องมุม วิวสวย, เครื่องปรับอากาศ, ตู้เย็น, เครื่องทำน้ำอุ่น');