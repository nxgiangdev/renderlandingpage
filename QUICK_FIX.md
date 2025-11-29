# 🚨 Quick Fix: API Key Not Found

## Vấn đề
Vite không load được biến môi trường từ file `.env`

## Giải pháp NGAY LẬP TỨC

### Bước 1: Dừng Dev Server
Trong terminal đang chạy `npm run dev`, nhấn:
```
Ctrl + C
```

### Bước 2: Xóa Cache Vite
```bash
rmdir /s /q node_modules\.vite
```
Hoặc xóa thủ công thư mục `node_modules\.vite`

### Bước 3: Khởi động lại
```bash
npm run dev
```

## Kiểm tra File .env

Đảm bảo file `.env` có nội dung chính xác (không có khoảng trắng thừa):

```env
```

**LƯU Ý QUAN TRỌNG:**
- Không có khoảng trắng trước/sau dấu `=`
- Không có dấu ngoặc kép
- Không có dòng trống ở đầu file
- File phải ở root directory (cùng cấp với `package.json`)

## Kiểm tra sau khi restart

Mở browser console (F12) và chạy:
```javascript
console.log('API Key:', import.meta.env.VITE_GEMINI_API_KEY)
console.log('All VITE keys:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')))
```

Nếu vẫn không thấy, thử:
1. Tạo lại file `.env` từ đầu
2. Đảm bảo không có BOM (Byte Order Mark)
3. Thử với encoding UTF-8 without BOM

