# 🚀 Hướng dẫn chạy Server API

## ✅ Đã tạo Express Server để xử lý Gemini API

Vercel AI SDK **KHÔNG thể chạy trong browser**, nên tôi đã tạo Express server để làm API proxy.

## 📋 Cách chạy

### Option 1: Chạy cả Server + Vite cùng lúc (Khuyến nghị)

```bash
npm run dev:all
```

Lệnh này sẽ chạy:
- Server API tại: `http://localhost:3001`
- Vite dev server tại: `http://localhost:5173`

### Option 2: Chạy riêng từng service

**Terminal 1 - Chạy Server:**
```bash
npm run server
```

**Terminal 2 - Chạy Vite:**
```bash
npm run dev
```

## 🔑 Cấu hình API Key

Server sẽ tự động lấy API key từ:
1. Environment variable: `GEMINI_API_KEY` (trong file `.env`)
2. Hoặc hardcode fallback (chỉ cho dev)

Để thêm vào `.env`:
```
GEMINI_API_KEY=your_api_key_here
```

## 📡 API Endpoints

- `GET /health` - Health check
- `POST /api/gen-landing` - Generate landing page

## ✅ Lợi ích

1. ✅ **Bảo mật**: API key không bị expose trong browser
2. ✅ **Hoạt động**: Vercel AI SDK chạy đúng môi trường server-side
3. ✅ **Linh hoạt**: Dễ dàng thêm middleware, rate limiting, caching...

## 🐛 Troubleshooting

Nếu gặp lỗi "Không thể kết nối đến server API":
1. Đảm bảo server đang chạy: `npm run server`
2. Kiểm tra port 3001 có bị chiếm không
3. Kiểm tra console log của server để xem lỗi chi tiết

