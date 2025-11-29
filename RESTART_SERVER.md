# 🔄 Hướng dẫn Restart Server

## ⚠️ Nếu gặp lỗi 404

Server có thể đang chạy nhưng chưa load đúng route. Hãy làm theo các bước sau:

### 1. Dừng server cũ (nếu đang chạy)

**Windows:**
- Mở Task Manager (Ctrl + Shift + Esc)
- Tìm process `node.exe` hoặc `node server.js`
- End Task

Hoặc trong terminal đang chạy server, nhấn `Ctrl + C`

### 2. Khởi động lại server

**Option A: Chạy riêng server**
```bash
npm run server
```

**Option B: Chạy cả server + vite**
```bash
npm run dev:all
```

### 3. Kiểm tra server đã chạy

Mở browser và truy cập:
- http://localhost:3001/health
- http://localhost:3001/api/test

Nếu thấy JSON response → Server đã chạy đúng ✅

### 4. Thử lại generate landing page

Sau khi server chạy, refresh trang React và thử generate lại.

