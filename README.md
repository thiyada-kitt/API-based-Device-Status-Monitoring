### API-based Device Status Monitoring
----------------------------

client: ดึงข้อมูลเพื่อตรวจสอบสถานะของเครื่อง server

server: ส่งข้อมูลแสดงไปยัง client

----

**ประโยชน์:**
- ง่ายต่อการติดตามสถานะของเครื่อง server
- เห็นอัตราการใช้ทรัพยากรภายในเครื่อง
- จัดการระบบได้มีประสิทธิภาพ

**ประเภทของเซิร์ฟเวอร์:**
- Web Socket [สำหรับการอัปเดตข้อมูล]

**ทรัพยากรที่ต้องการตรวจสอบ:**
- Online/Offline
- CPU
- RAM
- Disk Usage
- Network Usage
- Disk I/O

**เพิ่มเติม:**
- มีการ reconnect เมื่อ WebSocket ขาดหายในทุก ๆ 5 วินาที
- ปุ่ม Stop สำหรับหยุดการดึงข้อมูล

----

**Frontend:** React [single-page]

**Backend:** FastAPI สำหรับจัดการ WebSocket และดึงข้อมูลสถานะเซิร์ฟเวอร์

----
**API Methods:**

| Method     | Endpoint            | Description                            |
|------------|---------------------|----------------------------------------|
| GET        | /servers            | ดึงข้อมูลสถานะของเครื่องทั้งหมด       |
| GET        | /servers/{id}       | ดึงข้อมูลสถานะของเครื่องที่ระบุ ID    |
| PUT        | /servers/{id}/status| อัปเดตสถานะของเครื่องที่ระบุ ID       |
| WebSocket  | /ws/monitor         | ส่งสถานะแบบเรียลไทม์                  |

`constraints: ไม่มีการใช้ OAuth 2.0 หรือ JWT ยืนยันตัวตนของ client เมื่อเข้าถึง API, ไม่มีการจัดเก็บข้อมูลลงdb`

**การจัดการ**
- 200 OK: แสดงผลได้ปกติ
- 400 Bad Request: หาก client ส่ง request ผิด
- 404 Not Found: หากไม่พบเซิร์ฟเวอร์
- 500 Internal Server Error: หากเซิร์ฟเวอร์มีปัญหา

----

```bash
# Setup:

install server -> pip install fastapi[all] psutil uvicorn

run server -> uvicorn main:app --reload
              uvicorn app.main:app --reload

install client -> npm install

run client -> npm start

check fastapi -> http://localhost:8000/docs

check websocket -> ws://localhost:8000/ws/monitor

>> 65090500416-thiyada