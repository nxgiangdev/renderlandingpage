# Hướng dẫn thiết lập API Key cho Gemini

## ⚠️ Lỗi: API Key bị leak

Nếu bạn gặp lỗi "Your API key was reported as leaked", API key cũ đã bị Google vô hiệu hóa. Bạn cần tạo API key mới.

## Các bước khắc phục:

### 1. Tạo API Key mới từ Google AI Studio

1. Truy cập: https://aistudio.google.com/apikey
2. Đăng nhập bằng tài khoản Google của bạn
3. Click **"Create API Key"** hoặc **"Get API Key"**
4. Chọn project hoặc tạo project mới
5. Copy API key mới

### 2. Lưu API Key vào file .env

1. Tạo hoặc mở file `.env` trong thư mục root của project
2. Thêm dòng sau (thay `YOUR_NEW_API_KEY` bằng API key mới):

```
VITE_GEMINI_API_KEY=YOUR_NEW_API_KEY
```

**Ví dụ:**
```
VITE_GEMINI_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz123456
```

### 3. Restart dev server

1. Dừng server hiện tại (Ctrl+C trong terminal)
2. Chạy lại:
```bash
npm run dev
```

### 4. Kiểm tra

- Refresh trang web
- Thử generate landing page mới
- Nếu vẫn lỗi, kiểm tra lại:
  - File `.env` có đúng tên không (không có extension)
  - API key có đúng format không (bắt đầu bằng `AIzaSy`)
  - Đã restart server chưa

## ⚠️ Lưu ý bảo mật:

1. **KHÔNG BAO GIỜ** commit file `.env` lên GitHub
2. **KHÔNG BAO GIỜ** hardcode API key trong code
3. File `.env` đã được thêm vào `.gitignore` để tránh commit nhầm
4. Nếu API key bị leak, hãy xóa ngay trong Google Cloud Console và tạo key mới

## Xóa API Key cũ (nếu cần):

1. Truy cập: https://console.cloud.google.com/apis/credentials
2. Tìm API key bị leak
3. Click vào key đó
4. Click **"Delete"** hoặc **"Revoke"**

