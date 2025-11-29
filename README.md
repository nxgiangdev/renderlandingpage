# 🚀 AI Landing Page Generator - Tài Liệu Dự Án

## 📋 Mục Lục

- [Tổng Quan](#tổng-quan)
- [Mục Tiêu](#mục-tiêu)
- [Tính Năng](#tính-năng)
- [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
- [Flow Hoạt Động](#flow-hoạt-động)
- [Roadmap Phát Triển](#roadmap-phát-triển)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cài Đặt & Chạy Dự Án](#cài-đặt--chạy-dự-án)
- [API Documentation](#api-documentation)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)

---

## 🎯 Tổng Quan

**AI Landing Page Generator** là một nền tảng web cho phép người dùng tạo landing page tự động bằng AI. Chỉ cần nhập mô tả nhu cầu, hệ thống sẽ sử dụng Google Gemini AI để phân tích và tự động sinh ra template landing page phù hợp. Người dùng có thể chỉnh sửa bằng giao diện kéo-thả, chỉnh sửa mã code trực tiếp, và tải về để sử dụng cho website thực tế.

### Điểm Nổi Bật

- ✨ **Tự Động Hóa**: AI phân tích prompt và tạo landing page hoàn chỉnh
- 🎨 **Tùy Chỉnh Linh Hoạt**: Drag & drop editor + code editor
- 📦 **Export Đa Dạng**: Tải ZIP, copy code, hoặc publish trực tiếp
- 🚀 **Nhanh Chóng**: Từ ý tưởng đến landing page trong vài phút

---

## 🎯 Mục Tiêu

1. **Tự Động Hóa Quy Trình**: Giảm thời gian tạo landing page từ vài giờ xuống vài phút
2. **Thân Thiện Người Dùng**: Giao diện đơn giản, không cần kiến thức code
3. **Linh Hoạt**: Hỗ trợ cả người dùng không biết code và developer
4. **Chất Lượng**: Tạo ra landing page đẹp, responsive, và tối ưu UX/UI

---

## ✨ Tính Năng

### 1. AI Prompt Interface
- Giao diện chat/prompt box giống ChatGPT
- Nhập mô tả nhu cầu bằng ngôn ngữ tự nhiên
- Ví dụ: *"Tạo landing page giới thiệu ứng dụng đặt lịch chăm sóc sắc đẹp với tông màu xanh pastel"*

### 2. AI Analysis & Generation
- **Phân tích tự động**:
  - Xác định lĩnh vực (Beauty, Real Estate, Fitness, F&B, SaaS...)
  - Nhận diện tone & style (Modern, Corporate, Playful, Minimalist, Vintage...)
  - Đề xuất màu sắc phù hợp
  - Xác định layout và các section cần thiết
  
- **Tạo template**:
  - HTML/CSS/JS hoặc React/Next.js với TailwindCSS
  - Responsive design
  - Các section: Hero, Features, Pricing, Testimonials, CTA, Footer

### 3. Live Preview
- Hiển thị template ngay lập tức trong iframe preview
- Responsive preview (Desktop, Tablet, Mobile)
- Auto-reload khi code thay đổi

### 4. Regenerate & Refine
- **Regenerate**: Tạo lại template với style khác
- **Refine Prompt**: Chỉnh sửa prompt để tinh chỉnh kết quả
- **Style Variations**: Chọn style khác (Modern, Corporate, Playful...)

### 5. Drag & Drop Editor
- Kéo thả các block để sắp xếp lại layout
- Resize phần tử
- Edit text inline
- Thay đổi màu sắc, hình ảnh, icon
- Undo/Redo

### 6. Code Editor
- Monaco Editor (VS Code editor) tích hợp
- Syntax highlighting
- Auto-complete
- Real-time preview khi chỉnh sửa code
- Format code tự động

### 7. Export & Publish
- **Tải ZIP**: 
  - HTML/CSS/JS standalone
  - React/Next.js project hoàn chỉnh
- **Copy Code**: Copy từng section hoặc toàn bộ code
- **Publish** (tùy chọn):
  - Firebase Hosting
  - Subdomain tạm: `username.yourdomain.ai/page-xyz`

### 8. Template Intelligence
- Dictionary ngành nghề tự động nhận diện
- Gợi ý màu sắc và style phù hợp
- SEO optimization suggestions

---

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Prompt Input │  │  Live Preview │  │ Code Editor  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Drag & Drop  │  │  State Mgmt  │  │  Export UI   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API (Next.js API Routes)            │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Gemini API   │  │  Template    │  │  Export      │  │
│  │  Integration │  │  Generator   │  │  Service     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              External Services                            │
├─────────────────────────────────────────────────────────┤
│  • Google Gemini API                                     │
│  • Firebase Hosting (optional)                          │
│  • Supabase/Firebase (optional - for saving projects)    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Flow Hoạt Động

### 1. Giao Diện Prompt
```
User → Nhập prompt → Click "Generate Landing Page"
                    ↓
            Gửi request đến Gemini API
```

### 2. AI Analysis Layer
```
Gemini nhận prompt → Phân tích:
  ├─ Ý định (Bán hàng, giới thiệu, CV, Event...)
  ├─ Ngành (Beauty, Real Estate, Fitness, F&B...)
  ├─ Phong cách (Modern, Corporate, Playful...)
  ├─ Màu chủ đạo
  └─ Các section cần có
```

### 3. AI Rendering Layer
```
AI tạo code → HTML + TailwindCSS
            → React/Next.js components
            ↓
Frontend nhận code → Hiển thị trong iframe preview
                  → Parse thành blocks (cho drag & drop)
```

### 4. User Actions
```
┌─────────────────────────────────────────┐
│  Option 1: Regenerate                   │
│  → Tạo template khác                    │
├─────────────────────────────────────────┤
│  Option 2: Edit Layout (Drag & Drop)    │
│  → Chỉnh sửa bằng UI Builder            │
├─────────────────────────────────────────┤
│  Option 3: Edit Code                    │
│  → Tùy chỉnh mã nguồn trực tiếp         │
└─────────────────────────────────────────┘
```

### 5. Export
```
User hài lòng → Chọn export:
  ├─ Download ZIP (HTML/CSS/JS hoặc React project)
  ├─ Copy code
  └─ Publish lên hosting (optional)
```

---

## 📅 Roadmap Phát Triển

### Phase 1 – MVP (1–2 tuần) ✅

- [x] **1. Giao diện nhập prompt**
  - Input textbox + button "Generate"
  - Kết nối Gemini API
  - Loading states & error handling

- [x] **2. Render HTML AI trả về**
  - Iframe preview với sandbox
  - Auto-reload khi code thay đổi
  - Responsive preview modes

- [x] **3. Regenerate & Refine Prompt**
  - Nút Regenerate
  - Input để refine prompt
  - Lưu lịch sử prompts

### Phase 2 – Editor Cơ Bản (2–4 tuần) 🔄

- [ ] **4. Drag & Drop System**
  - Sử dụng DnD Kit
  - Chọn block
  - Di chuyển vị trí
  - Edit text inline
  - Resize elements

- [ ] **5. Monaco Editor**
  - Tab "Edit Code"
  - Syntax highlighting
  - Auto-complete
  - Real-time preview
  - Format code

### Phase 3 – Template Intelligence (2–4 tuần) 📋

- [ ] **6. Hệ thống xác định ngành nghề**
  - Dictionary ngành nghề:
    - Beauty & Spa
    - Gym & Fitness
    - E-commerce
    - SaaS Startup
    - Restaurant & F&B
    - Travel & Tourism
    - Real Estate
    - Education
    - Healthcare
    - Technology

- [ ] **7. AI mô tả màu sắc & style**
  - Light / Dark mode
  - Color schemes: Blue, Pastel, Neon, Pink Luxury, Corporate...
  - Style variations: Modern, Corporate, Playful, Minimalist, Vintage

### Phase 4 – Export System (1–2 tuần) 📦

- [ ] **8. Xuất file ZIP**
  - Sử dụng jszip + file-saver
  - Export HTML/CSS/JS standalone
  - Export React/Next.js project
  - Include assets (images, fonts)

- [ ] **9. Publish System (Optional)**
  - Firebase Hosting integration
  - Subdomain publishing: `username.yourdomain.ai/page-xyz`
  - Share link functionality

### Phase 5 – Nâng Cao (Tùy chọn) 🚀

- [ ] **10. User Accounts & Save Projects**
  - Authentication (Supabase/Firebase Auth)
  - Lưu projects vào database
  - Quản lý nhiều projects
  - Collaboration features

- [ ] **11. AI Enhancements**
  - Improve design suggestions
  - SEO optimization
  - Image/icon suggestions
  - Code explanation
  - Performance optimization

- [ ] **12. Template Library**
  - Pre-built templates
  - Community templates
  - Template marketplace

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend

| Công Nghệ | Mục Đích | Version |
|-----------|----------|---------|
| **Next.js** | React framework với SSR/SSG | Latest |
| **React** | UI library | 18+ |
| **TypeScript** | Type safety | Latest |
| **TailwindCSS** | Utility-first CSS framework | Latest |
| **Monaco Editor** | Code editor (VS Code editor) | Latest |
| **@dnd-kit/core** | Drag & drop functionality | Latest |
| **Zustand / Redux** | State management | Latest |
| **Framer Motion** | Animation library (optional) | Latest |
| **jszip** | ZIP file generation | Latest |
| **file-saver** | File download | Latest |

### Backend

| Công Nghệ | Mục Đích |
|-----------|----------|
| **Next.js API Routes** | Serverless API endpoints |
| **Google Gemini API** | AI generation |
| **Node.js** | Runtime environment |

### Database & Hosting (Optional)

| Service | Mục Đích |
|---------|----------|
| **Supabase / Firebase** | Database & Authentication |
| **Firebase Hosting** | Static hosting cho publish |
| **Vercel / Netlify** | Deployment platform |

---

## 🚀 Cài Đặt & Chạy Dự Án

### Yêu Cầu

- Node.js 18+ 
- npm hoặc yarn
- Google Gemini API key

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd Render_Landing_Page
```

### Bước 2: Cài Đặt Dependencies

```bash
npm install
# hoặc
yarn install
```

### Bước 3: Cấu Hình Environment Variables

Tạo file `.env.local`:

```env
# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Firebase (nếu dùng publish feature)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Optional: Supabase (nếu dùng database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Bước 4: Chạy Development Server

```bash
npm run dev
# hoặc
yarn dev
```

Mở trình duyệt tại: `http://localhost:3000`

### Bước 5: Build Production

```bash
npm run build
npm start
```

---

## 📚 API Documentation

### Gemini API Integration

#### Endpoint: `/api/generate`

**Method**: `POST`

**Request Body**:
```json
{
  "prompt": "Tạo landing page giới thiệu ứng dụng đặt lịch chăm sóc sắc đẹp với tông màu xanh pastel",
  "style": "modern", // optional
  "framework": "html" // "html" | "react" | "nextjs"
}
```

**Response**:
```json
{
  "success": true,
  "code": "<html>...</html>",
  "metadata": {
    "industry": "beauty",
    "style": "modern",
    "colorScheme": "pastel-blue",
    "sections": ["hero", "features", "pricing", "testimonials", "cta", "footer"]
  }
}
```

#### Prompt Template cho Gemini

```
You are an expert web designer. 
Based on the following prompt from the user, generate a full landing page with TailwindCSS:
- Follow modern responsive UI/UX principles
- Include sections: Hero, Features, CTA, Testimonials, Footer
- Use semantic HTML5
- Ensure mobile-first responsive design
- Generate clean, production-ready code
- Use TailwindCSS utility classes only

User prompt: {{user_prompt}}
```

### Export API

#### Endpoint: `/api/export`

**Method**: `POST`

**Request Body**:
```json
{
  "code": "<html>...</html>",
  "format": "html" // "html" | "react" | "nextjs"
}
```

**Response**: ZIP file download

---

## 📖 Hướng Dẫn Sử Dụng

### 1. Tạo Landing Page Mới

1. Vào trang chủ
2. Nhập prompt mô tả nhu cầu vào textbox
3. Click "Generate Landing Page"
4. Đợi AI xử lý (5-10 giây)
5. Xem preview kết quả

### 2. Chỉnh Sửa Bằng Drag & Drop

1. Click vào block muốn chỉnh sửa
2. Kéo thả để di chuyển vị trí
3. Click vào text để edit inline
4. Sử dụng sidebar để thay đổi màu sắc, font, spacing

### 3. Chỉnh Sửa Code

1. Click tab "Edit Code"
2. Sử dụng Monaco Editor để chỉnh sửa
3. Preview tự động cập nhật khi code thay đổi
4. Format code bằng `Shift + Alt + F`

### 4. Export

1. Click nút "Export"
2. Chọn format:
   - **HTML/CSS/JS**: Standalone files
   - **React Project**: Full React project với dependencies
   - **Next.js Project**: Next.js project hoàn chỉnh
3. Download ZIP file
4. Giải nén và sử dụng

### 5. Regenerate

- Click "Regenerate" để tạo template mới với cùng prompt
- Hoặc click "Refine" để chỉnh sửa prompt và tạo lại

---

## 🤖 Logic AI

### Các Job AI Có Thể Thực Hiện

1. **Generate Full Template**
   - Tạo landing page hoàn chỉnh từ prompt

2. **Transform Layout**
   - Thay đổi style khi user nhấn "style khác"
   - Chuyển đổi giữa các layout variations

3. **Improve Design**
   - Tối ưu UI/UX dựa trên best practices
   - Gợi ý cải thiện accessibility

4. **Explain Code**
   - Giải thích code cho người dùng
   - Hướng dẫn customize

5. **Suggest Images/Icons**
   - Gợi ý hình ảnh phù hợp
   - Đề xuất icon sets

6. **SEO Optimization**
   - Tối ưu meta tags
   - Gợi ý content improvements
   - Schema markup suggestions

---

## 📝 Notes & Best Practices

### Prompt Writing Tips

- **Cụ thể**: Mô tả rõ ràng về sản phẩm/dịch vụ
- **Style**: Chỉ định style mong muốn (modern, corporate, playful...)
- **Màu sắc**: Nêu rõ màu chủ đạo hoặc để AI tự chọn
- **Sections**: Liệt kê các section cần có (nếu có yêu cầu đặc biệt)

### Code Quality

- AI sẽ tạo code clean, semantic HTML5
- Sử dụng TailwindCSS utility classes
- Responsive design mobile-first
- Accessibility best practices

### Performance

- Optimize images
- Minify CSS/JS khi export
- Lazy loading cho images
- Code splitting cho React projects

---

## 🐛 Troubleshooting

### Gemini API Errors

- **API Key Invalid**: Kiểm tra `.env.local` file
- **Rate Limit**: Đợi vài phút rồi thử lại
- **Timeout**: Tăng timeout trong API route

### Preview Issues

- **Iframe không load**: Kiểm tra sandbox attributes
- **Styles không apply**: Đảm bảo TailwindCSS được include
- **Responsive không hoạt động**: Kiểm tra viewport meta tag

### Export Issues

- **ZIP file corrupt**: Kiểm tra jszip version
- **Missing assets**: Đảm bảo tất cả assets được include trong export

---

## 📄 License

[Thêm license của bạn]

---

## 👥 Contributors

[Thêm danh sách contributors]

---

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.

---

**Happy Building! 🚀**

"# renderlandingpage" 
