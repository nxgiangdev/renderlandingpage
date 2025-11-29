# 🔧 Troubleshooting Guide

## Lỗi: "Gemini API key không được tìm thấy"

### Nguyên nhân
File `.env` chưa được tạo hoặc dev server chưa được restart sau khi tạo file.

### Cách khắc phục

#### Bước 1: Kiểm tra file .env
Đảm bảo file `.env` tồn tại trong thư mục root của project với nội dung:

```env
VITE_GEMINI_API_KEY=AIzaSyCN0zJx7whRiSgAdKXFFYxyLdgRlQWpREM
```

#### Bước 2: Restart Dev Server
**QUAN TRỌNG**: Vite chỉ load biến môi trường khi khởi động, nên bạn PHẢI restart server:

1. **Dừng server hiện tại:**
   - Nhấn `Ctrl + C` trong terminal đang chạy `npm run dev`

2. **Khởi động lại:**
   ```bash
   npm run dev
   ```

#### Bước 3: Kiểm tra
Mở browser console (F12) và chạy:
```javascript
console.log(import.meta.env.VITE_GEMINI_API_KEY)
```

Nếu hiển thị API key (không phải `undefined`) thì đã OK.

### Lưu ý

- ✅ File `.env` phải ở **root directory** (cùng cấp với `package.json`)
- ✅ Biến môi trường phải có prefix `VITE_` để Vite expose ra client
- ✅ **Luôn restart dev server** sau khi tạo/sửa file `.env`
- ✅ File `.env` đã được thêm vào `.gitignore` để bảo mật

### Vẫn còn lỗi?

1. Kiểm tra file `.env` có đúng format không (không có khoảng trắng thừa)
2. Kiểm tra API key có hợp lệ không
3. Xóa cache và restart:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

## Các lỗi khác

### Lỗi kết nối API
- Kiểm tra kết nối internet
- Kiểm tra API key có hợp lệ không
- Kiểm tra quota của Gemini API

### Preview không hiển thị
- Kiểm tra console có lỗi không
- Đảm bảo HTML code từ Gemini hợp lệ
- Kiểm tra iframe permissions

