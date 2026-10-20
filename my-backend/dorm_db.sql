-- สร้างและเลือกใช้งานฐานข้อมูล
CREATE DATABASE IF NOT EXISTS `dorm_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dorm_db`;

-- 1. โครงสร้างตาราง rooms
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `room_number` VARCHAR(10) NOT NULL UNIQUE,
  `room_type` ENUM('fan', 'air') NOT NULL DEFAULT 'fan',
  `price` DECIMAL(10,2) NOT NULL,
  `floor` INT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'ว่าง',
  `details` TEXT DEFAULT NULL,
  `tenant_name` VARCHAR(100) DEFAULT NULL,
  `tenant_phone` VARCHAR(20) DEFAULT NULL,
  `image_url` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. โครงสร้างตาราง bookings
CREATE TABLE `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `room_id` INT NOT NULL,
  `student_name` VARCHAR(100) NOT NULL,
  `student_id` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `check_in_date` DATE DEFAULT '0000-00-00',
  `note` TEXT DEFAULT NULL,
  `booking_status` VARCHAR(20) DEFAULT 'confirmed',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. ข้อมูลห้องพักทั้งหมดในตาราง rooms (18 ห้อง)
INSERT INTO `rooms` (`id`, `room_number`, `room_type`, `price`, `floor`, `status`, `details`, `tenant_name`, `tenant_phone`, `image_url`) VALUES
(1, '101', 'air', 2800.00, 1, 'จองแล้ว', 'ห้องพัดลมชั้น 1 ใต้ร่มไม้ ใกล้ประตูทางเข้าและร้านสะดวกซื้อ เตียงเดี่ยว 3.5 ฟุต โต๊ะหนังสือ ตู้เสื้อผ้า พัดลมเพดาน และห้องน้ำในตัว', 'ปิยาพร สุภาพ', '0974318692', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'),
(2, '102', 'fan', 2800.00, 1, 'จองแล้ว', 'ห้องพัดลมชั้น 1 ฝั่งทิศตะวันออก อากาศถ่ายเทสะดวก เฟอร์นิเจอร์ครบ เตียง 3.5 ฟุต โต๊ะอ่านหนังสือ ระเบียงตากผ้า', 'สมหมาย', '087-439-5239', 'https://i.pinimg.com/736x/94/4d/78/944d78963151855b7964df591efb045e.jpg'),
(5, '201', 'air', 4500.00, 2, 'จองแล้ว', 'ห้องปรับอากาศชั้น 2 วิวสวนร่มรื่น แอร์ Daikin เตียงคู่ 5 ฟุต ตู้เสื้อผ้าบิวท์อิน โต๊ะอ่านหนังสือคู่ เครื่องทำน้ำอุ่น', 'จ้า', '094-739-4281', 'https://i.pinimg.com/1200x/bc/c7/6b/bcc76ba63af09d7d91e6bba8d88e0409.jpg'),
(6, '202', 'air', 3000.00, 2, 'จองแล้ว', 'ห้องพัดลมชั้น 2 เงียบสงบ เหมาะกับการอ่านหนังสือ เตียงเดี่ยว 3.5 ฟุต พัดลมติดผนัง ตู้เสื้อผ้า ระเบียงส่วนตัว', 'แบงค์', '065-739-4855', 'https://i.pinimg.com/1200x/15/7c/89/157c89a4c1c5fb46ba4334313f8902d1.jpg'),
(7, '203', 'air', 4500.00, 2, 'จองแล้ว', 'ห้องปรับอากาศชั้น 2 ติดบันไดหนีไฟ เฟอร์นิเจอร์ไม้โมเดิร์น แอร์เย็นฉ่ำ เครื่องทำน้ำอุ่น ระเบียงกว้าง', 'แอ๋น', '087-471-8520', 'https://i.pinimg.com/736x/55/c1/60/55c16fdd2974b1f63bc05e94b281bfda.jpg'),
(8, '204', 'fan', 3000.00, 2, 'ว่าง', 'ห้องพัดลมชั้น 2 ห้องหัวมุม ลมพัดผ่านตลอดวัน แดดเช้า เตียงเดี่ยว โต๊ะเครื่องแป้ง ห้องน้ำแยกส่วนเปียก-แห้ง', NULL, NULL, 'https://i.pinimg.com/1200x/d3/2d/a6/d32da6182351ed7100b46761fe60f855.jpg'),
(9, '301', 'air', 4800.00, 3, 'ว่าง', 'ห้องปรับอากาศชั้น 3 วิวมหาวิทยาลัย เตียง 5 ฟุต สปริงเกรดพรีเมียม โซฟาพักผ่อน Smart TV ตู้เย็น ไมโครเวฟ', NULL, NULL, 'https://i.pinimg.com/1200x/01/a7/85/01a785ba2d873138b555e5bf55b111ee.jpg'),
(10, '302', 'air', 4800.00, 3, 'ว่าง', 'ห้องปรับอากาศชั้น 3 ตกแต่งสไตล์มินิมอล แอร์ประหยัดไฟเบอร์ 5 โต๊ะทำงานขนาดใหญ่พร้อมเก้าอี้เพื่อสุขภาพ', NULL, NULL, 'https://i.pinimg.com/1200x/c8/e9/73/c8e9737d0f0b2841be82bb21d7b1e4c9.jpg'),
(11, '303', 'fan', 3200.00, 3, 'ว่าง', 'ห้องพัดลมชั้น 3 วิวมุมสูง อากาศโปร่งสบาย เฟอร์นิเจอร์ไม้โอ๊คครบเซ็ต พร้อมจุดเชื่อมต่อสาย LAN', NULL, NULL, 'https://i.pinimg.com/1200x/17/05/4e/17054ec0624ffa4f3e69fa0246a48f76.jpg'),
(12, '304', 'fan', 3200.00, 3, 'ว่าง', 'ห้องพัดลมชั้น 3 ทิศเหนือไม่ร้อนยามบ่าย ระเบียงซักล้างกว้างขวาง ปลั๊กไฟหลายจุด ปลอดภัยด้วยคีย์การ์ด', NULL, NULL, 'https://i.pinimg.com/736x/8a/b7/bb/8ab7bbec322b8eb3ec8a7e0f2f01f422.jpg'),
(13, '401', 'air', 5000.00, 4, 'ว่าง', 'ห้องปรับอากาศชั้น 4 ชั้น VIP เงียบสงบ เตียงคิงไซส์ 6 ฟุต แอร์ระบบกรองฝุ่น PM2.5 ตู้เย็น 2 ประตู เครื่องทำน้ำอุ่น', NULL, NULL, 'https://i.pinimg.com/1200x/51/73/30/51733015f7a863b1511252174c3dcf1c.jpg'),
(14, '402', 'air', 5000.00, 4, 'ว่าง', 'ห้องปรับอากาศชั้น 4 อยู่ระหว่างตรวจเช็คแอร์ประจำปีและทำความสะอาดฟิลเตอร์', NULL, NULL, 'https://i.pinimg.com/1200x/bd/31/08/bd3108cab7370a44275f3a09fb2a4d96.jpg'),
(15, '403', 'fan', 3400.00, 4, 'ว่าง', 'ห้องพัดลมชั้น 4 ลมโกรกตลอดทั้งปี ประหยัดไฟ เตียง 3.5 ฟุต 2 หลัง (แชร์รูมเมทได้) ตู้เสื้อผ้า 2 ตู้', NULL, NULL, 'https://i.pinimg.com/1200x/a0/b6/8c/a0b68c3db5ce3f7c468e2254388e6783.jpg'),
(16, '501', 'air', 5200.00, 5, 'ว่าง', 'ห้องปรับอากาศชั้น 5 วิวดาดฟ้า พานอรามา แอร์ 18,000 BTU เตียง 6 ฟุต ห้องกว้างขวาง มีพื้นที่ออกกำลังกายเบาๆ', NULL, NULL, 'https://i.pinimg.com/1200x/ff/c1/69/ffc169df4ecdbfc65427d11f9fe31885.jpg'),
(17, '502', 'air', 5200.00, 5, 'มีผู้เช่า', 'ห้องปรับอากาศชั้น 5 ห้องหัวมุม ส่วนตัวที่สุดในตึก พร้อมเครื่องซักผ้าส่วนตัวที่ระเบียงและไมโครเวฟ', 'เอ้ม', '054-753-2687', 'https://i.pinimg.com/1200x/fe/a3/35/fea335ccbe90192e21245719ae55ceb2.jpg'),
(25, '503', 'air', 4000.00, 5, 'ว่าง', 'ห้องพักสะอาด เดินทางสะดวก เฟอร์นิเจอร์ครบชุด พร้อมเข้าอยู่', NULL, NULL, 'https://i.pinimg.com/736x/50/db/3b/50db3bcdfea2ac8ecb97c4fb27e2a9b7.jpg'),
(27, '103', 'air', 6000.00, 1, 'จองแล้ว', 'ห้องสวย', 'นาน่า', '0123456789', 'https://i.pinimg.com/736x/c2/01/81/c20181be4a7b0b45f1b518cf085b881d.jpg'),
(28, '504', 'air', 2500.00, 5, 'ว่าง', 'ห้องใหม่', NULL, NULL, 'https://i.pinimg.com/736x/e2/2c/98/e22c98e2d21691e2e92a8e8e77a2842d.jpg');

-- 4. ข้อมูลการจองในตาราง bookings
INSERT INTO `bookings` (`id`, `room_id`, `student_name`, `student_id`, `email`, `phone`, `check_in_date`, `note`, `booking_status`, `created_at`) VALUES
(1, 1, 'ปิยาพร สุภาพ', '68', NULL, '0974318692', '0000-00-00', NULL, 'confirmed', '2026-10-20 20:12:10'),
(2, 27, 'นาน่า', '67', NULL, '0123456789', '0000-00-00', NULL, 'confirmed', '2026-10-20 20:38:38'),
(8, 5, 'จ้า', '67', NULL, '094-739-4281', '0000-00-00', NULL, 'confirmed', '2026-10-20 20:57:26'),
(12, 2, 'สมหมาย', '67', NULL, '087-439-5239', '0000-00-00', NULL, 'confirmed', '2026-10-20 21:02:33'),
(14, 6, 'แบงค์', '66', NULL, '065-739-4855', '0000-00-00', NULL, 'confirmed', '2026-10-20 21:24:49'),
(15, 7, 'แอ๋น', '65', NULL, '087-471-8520', '0000-00-00', NULL, 'confirmed', '2026-10-20 21:31:56'),
(17, 17, 'เอ้ม', '66', NULL, '054-753-2687', '0000-00-00', NULL, 'confirmed', '2026-10-20 22:10:17');