# 🚀 Hướng Dẫn Setup & Chạy Project

## Bước 1: Cài Đặt Dependencies

```bash
npm install
```

## Bước 2: Cấu Hình Environment Variables

Tạo file `.env` trong thư mục root với nội dung:

```env
```

**Lưu ý**: File `.env` đã được thêm vào `.gitignore` để bảo mật.

## Bước 3: Chạy Development Server

```bash
npm run dev
```

Project sẽ chạy tại: `http://localhost:3000`

## Bước 4: Build Production

```bash
npm run build
```

Files sẽ được build vào thư mục `dist/`

## 📁 Cấu Trúc Project

```
src/
├── components/          # React components
│   ├── PromptInput.jsx
│   ├── Preview.jsx
│   ├── ActionButtons.jsx
│   └── RefinePromptModal.jsx
├── services/           # API services
│   └── geminiService.js
├── utils/             # Utility functions
│   └── promptTemplates.js
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── styles/            # CSS files
├── App.jsx            # Main App component
└── main.jsx           # Entry point
```

## 🎯 Tính Năng Đã Hoàn Thành (Phase 1 - MVP)

✅ Setup project với Vite + React + TailwindCSS  
✅ Giao diện nhập prompt (giống ChatGPT)  
✅ Kết nối Gemini API  
✅ Preview HTML trong iframe  
✅ Regenerate & Refine prompt  

## 🐛 Troubleshooting

### Lỗi: "Gemini API key không được tìm thấy"
- Kiểm tra file `.env` có tồn tại không
- Đảm bảo biến môi trường có prefix `VITE_`
- Restart dev server sau khi thêm `.env`

### Lỗi: "Cannot connect to Gemini API"
- Kiểm tra kết nối internet
- Kiểm tra API key có hợp lệ không
- Kiểm tra console để xem lỗi chi tiết

### Preview không hiển thị
- Kiểm tra console có lỗi không
- Đảm bảo HTML code từ Gemini có đầy đủ tags
- Kiểm tra iframe sandbox permissions

## 📝 Notes

- API key đã được cung cấp và lưu trong file `.env.example` (không commit vào git)
- Project sử dụng Vite để build nhanh hơn
- TailwindCSS được cấu hình sẵn với custom colors
- Gemini API có timeout 60 giây

