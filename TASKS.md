# 📋 Danh Sách Công Việc - AI Landing Page Generator

> **Framework**: ReactJS  
> **Status**: 🟡 In Progress  
> **Last Updated**: 2024

---

## 📊 Tổng Quan Tiến Độ

- **Phase 1 (MVP)**: 🔴 0/3 tasks completed
- **Phase 2 (Editor)**: 🔴 0/2 tasks completed  
- **Phase 3 (Intelligence)**: 🔴 0/2 tasks completed
- **Phase 4 (Export)**: 🔴 0/2 tasks completed
- **Phase 5 (Advanced)**: 🔴 0/3 tasks completed

**Tổng**: 0/12 major tasks

---

## 🚀 Phase 1 – MVP (1–2 tuần)

### ✅ Task 1.1: Setup Project & Dependencies
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 4-6 hours

#### Subtasks:
- [ ] Khởi tạo React project với Create React App hoặc Vite
- [ ] Cài đặt dependencies cơ bản:
  - [ ] `react`, `react-dom`
  - [ ] `react-router-dom` (nếu cần routing)
  - [ ] `axios` hoặc `fetch` cho API calls
  - [ ] `tailwindcss` + `autoprefixer` + `postcss`
- [ ] Setup TailwindCSS configuration
- [ ] Tạo folder structure:
  ```
  src/
    ├── components/
    ├── pages/
    ├── services/
    ├── hooks/
    ├── utils/
    ├── styles/
    └── App.js
  ```
- [ ] Setup environment variables (.env)
- [ ] Tạo file `.gitignore`

**Files to create:**
- `package.json`
- `tailwind.config.js`
- `postcss.config.js`
- `.env.example`
- `.gitignore`

---

### ✅ Task 1.2: Giao Diện Nhập Prompt
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 6-8 hours

#### Subtasks:
- [ ] Tạo component `PromptInput.jsx`
  - [ ] Textarea/Input field lớn (giống ChatGPT)
  - [ ] Placeholder text gợi ý
  - [ ] Button "Generate Landing Page"
  - [ ] Loading state khi đang xử lý
  - [ ] Disable button khi đang generate
- [ ] Tạo component `PromptHistory.jsx` (optional)
  - [ ] Lưu lịch sử prompts trong localStorage
  - [ ] Hiển thị danh sách prompts đã dùng
  - [ ] Click để sử dụng lại prompt
- [ ] Styling với TailwindCSS
  - [ ] Responsive design
  - [ ] Dark mode support (optional)
- [ ] Validation input (không cho submit nếu rỗng)

**Files to create:**
- `src/components/PromptInput.jsx`
- `src/components/PromptHistory.jsx` (optional)
- `src/styles/promptInput.css` (nếu cần custom styles)

**Components structure:**
```jsx
<PromptInput 
  onSubmit={handleGenerate}
  isLoading={isGenerating}
  placeholder="Nhập mô tả landing page của bạn..."
/>
```

---

### ✅ Task 1.3: Kết Nối Gemini API
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 8-10 hours

#### Subtasks:
- [ ] Tạo service `geminiService.js`
  - [ ] Function `generateLandingPage(prompt)`
  - [ ] Xử lý API call đến Gemini API
  - [ ] Error handling
  - [ ] Timeout handling
- [ ] Tạo prompt template cho Gemini
  - [ ] System prompt với instructions
  - [ ] Format response (HTML + TailwindCSS)
  - [ ] Yêu cầu sections cụ thể
- [ ] Tạo API route (nếu dùng backend) hoặc call trực tiếp từ frontend
- [ ] Parse response từ Gemini
  - [ ] Extract HTML code
  - [ ] Extract metadata (industry, style, colors...)
- [ ] Error handling UI
  - [ ] Hiển thị error message
  - [ ] Retry button
- [ ] Loading states
  - [ ] Progress indicator
  - [ ] Estimated time remaining

**Files to create:**
- `src/services/geminiService.js`
- `src/utils/promptTemplates.js`
- `src/hooks/useGemini.js` (custom hook)

**Example structure:**
```javascript
// geminiService.js
export const generateLandingPage = async (prompt) => {
  const systemPrompt = `You are an expert web designer...`;
  // API call logic
  return { code, metadata };
};
```

---

### ✅ Task 1.4: Render HTML Preview (Iframe)
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 6-8 hours

#### Subtasks:
- [ ] Tạo component `Preview.jsx`
  - [ ] Iframe element với sandbox attributes
  - [ ] Inject HTML code vào iframe
  - [ ] Handle TailwindCSS CDN hoặc inline styles
- [ ] Tạo component `PreviewContainer.jsx`
  - [ ] Layout với preview area
  - [ ] Responsive preview modes (Desktop/Tablet/Mobile)
  - [ ] Toggle buttons để switch preview size
- [ ] Auto-reload khi code thay đổi
  - [ ] Watch code changes
  - [ ] Debounce để tránh reload quá nhiều
- [ ] Error handling trong iframe
  - [ ] Catch errors từ iframe
  - [ ] Hiển thị error message
- [ ] Loading state cho preview
- [ ] Fullscreen preview option

**Files to create:**
- `src/components/Preview.jsx`
- `src/components/PreviewContainer.jsx`
- `src/hooks/usePreview.js` (custom hook)

**Preview component structure:**
```jsx
<PreviewContainer>
  <PreviewModeToggle />
  <Preview 
    code={generatedCode}
    mode="desktop" // desktop | tablet | mobile
  />
</PreviewContainer>
```

---

### ✅ Task 1.5: Regenerate & Refine Prompt
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 4-6 hours

#### Subtasks:
- [ ] Tạo component `ActionButtons.jsx`
  - [ ] Button "Regenerate" (tạo lại với cùng prompt)
  - [ ] Button "Refine Prompt" (mở modal để chỉnh sửa prompt)
- [ ] Tạo component `RefinePromptModal.jsx`
  - [ ] Modal với textarea
  - [ ] Pre-fill prompt hiện tại
  - [ ] Button "Generate with new prompt"
  - [ ] Button "Cancel"
- [ ] Lưu prompt history
  - [ ] localStorage hoặc state management
  - [ ] Hiển thị prompt đã dùng
- [ ] Style variations (optional)
  - [ ] Dropdown chọn style: Modern, Corporate, Playful...
  - [ ] Regenerate với style khác

**Files to create:**
- `src/components/ActionButtons.jsx`
- `src/components/RefinePromptModal.jsx`
- `src/utils/promptHistory.js`

---

## 🎨 Phase 2 – Editor Cơ Bản (2–4 tuần)

### ✅ Task 2.1: Drag & Drop System
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 12-16 hours

#### Subtasks:
- [ ] Cài đặt `@dnd-kit/core` và `@dnd-kit/sortable`
- [ ] Parse HTML thành blocks/components
  - [ ] Tạo utility `parseHTMLToBlocks.js`
  - [ ] Identify các sections (Hero, Features, CTA...)
  - [ ] Tạo block structure với metadata
- [ ] Tạo component `BlockEditor.jsx`
  - [ ] DnD context provider
  - [ ] Sortable list của blocks
  - [ ] Visual indicators khi drag
- [ ] Tạo component `BlockItem.jsx`
  - [ ] Render preview của block
  - [ ] Drag handle
  - [ ] Selection state
  - [ ] Delete button
- [ ] Tạo component `BlockSidebar.jsx`
  - [ ] Hiển thị danh sách blocks
  - [ ] Add new block button
  - [ ] Block templates library
- [ ] Implement drag & drop
  - [ ] Move blocks up/down
  - [ ] Reorder blocks
  - [ ] Visual feedback
- [ ] Save block structure to state
  - [ ] Update code khi blocks thay đổi
  - [ ] Sync với preview

**Files to create:**
- `src/components/BlockEditor.jsx`
- `src/components/BlockItem.jsx`
- `src/components/BlockSidebar.jsx`
- `src/utils/parseHTMLToBlocks.js`
- `src/utils/blocksToHTML.js`
- `src/hooks/useBlockEditor.js`

**Dependencies to install:**
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

### ✅ Task 2.2: Inline Text Editor
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 6-8 hours

#### Subtasks:
- [ ] Tạo component `InlineEditor.jsx`
  - [ ] Click vào text để edit
  - [ ] Input field overlay
  - [ ] Save/Cancel buttons
- [ ] Tích hợp với BlockEditor
  - [ ] Detect text elements trong blocks
  - [ ] Make text editable
- [ ] Update code khi text thay đổi
  - [ ] Replace text trong HTML
  - [ ] Re-render preview
- [ ] Keyboard shortcuts
  - [ ] Enter to save
  - [ ] Escape to cancel

**Files to create:**
- `src/components/InlineEditor.jsx`
- `src/hooks/useInlineEdit.js`

---

### ✅ Task 2.3: Property Editor (Colors, Fonts, Spacing)
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 8-10 hours

#### Subtasks:
- [ ] Tạo component `PropertyPanel.jsx`
  - [ ] Sidebar với các controls
  - [ ] Show khi select block
- [ ] Color picker
  - [ ] Background color
  - [ ] Text color
  - [ ] Border color
  - [ ] Preset color palettes
- [ ] Typography controls
  - [ ] Font family selector
  - [ ] Font size slider
  - [ ] Font weight
  - [ ] Line height
- [ ] Spacing controls
  - [ ] Padding
  - [ ] Margin
  - [ ] Gap (cho flex/grid)
- [ ] Update code với TailwindCSS classes
  - [ ] Apply changes to selected block
  - [ ] Update preview

**Files to create:**
- `src/components/PropertyPanel.jsx`
- `src/components/ColorPicker.jsx`
- `src/components/TypographyControls.jsx`
- `src/utils/applyStyles.js`

**Dependencies to install:**
```bash
npm install react-color  # hoặc color picker khác
```

---

### ✅ Task 2.4: Monaco Editor Integration
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 10-12 hours

#### Subtasks:
- [ ] Cài đặt Monaco Editor
  - [ ] `@monaco-editor/react` package
  - [ ] Configure webpack (nếu cần)
- [ ] Tạo component `CodeEditor.jsx`
  - [ ] Monaco Editor instance
  - [ ] Tab system (HTML, CSS, JS nếu tách riêng)
  - [ ] Language mode: HTML
  - [ ] Theme (light/dark)
- [ ] Real-time preview sync
  - [ ] Watch code changes
  - [ ] Debounce updates
  - [ ] Update preview iframe
- [ ] Code formatting
  - [ ] Format on save (Shift + Alt + F)
  - [ ] Prettier integration (optional)
- [ ] Syntax highlighting
  - [ ] HTML/CSS/JS support
- [ ] Error detection
  - [ ] Highlight syntax errors
  - [ ] Show error messages
- [ ] Split view (Code + Preview)
  - [ ] Resizable panels
  - [ ] Toggle fullscreen

**Files to create:**
- `src/components/CodeEditor.jsx`
- `src/components/EditorTabs.jsx`
- `src/hooks/useCodeEditor.js`

**Dependencies to install:**
```bash
npm install @monaco-editor/react
```

---

## 🧠 Phase 3 – Template Intelligence (2–4 tuần)

### ✅ Task 3.1: Industry Detection System
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 8-10 hours

#### Subtasks:
- [ ] Tạo dictionary `industryDictionary.js`
  - [ ] Keywords cho từng ngành:
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
- [ ] Tạo utility `detectIndustry.js`
  - [ ] Analyze prompt text
  - [ ] Match keywords
  - [ ] Return industry + confidence score
- [ ] Tích hợp với Gemini prompt
  - [ ] Include industry context trong system prompt
  - [ ] Suggest industry-specific sections
- [ ] UI hiển thị detected industry
  - [ ] Badge/tag hiển thị industry
  - [ ] Allow user to override

**Files to create:**
- `src/utils/industryDictionary.js`
- `src/utils/detectIndustry.js`
- `src/components/IndustryBadge.jsx`

---

### ✅ Task 3.2: Style & Color Intelligence
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 10-12 hours

#### Subtasks:
- [ ] Tạo `styleDictionary.js`
  - [ ] Style definitions:
    - Modern: clean, minimal, bold typography
    - Corporate: professional, blue tones, structured
    - Playful: colorful, rounded, fun
    - Minimalist: lots of white space, simple
    - Vintage: retro colors, classic fonts
- [ ] Tạo `colorPalettes.js`
  - [ ] Predefined color schemes:
    - Pastel Blue
    - Corporate Blue
    - Neon
    - Pink Luxury
    - Earth Tones
    - Dark Mode
- [ ] Tạo utility `detectStyle.js`
  - [ ] Analyze prompt for style keywords
  - [ ] Match với style dictionary
- [ ] Tạo utility `suggestColors.js`
  - [ ] Based on industry + style
  - [ ] Return color palette
- [ ] UI cho style selection
  - [ ] Style selector dropdown
  - [ ] Color palette picker
  - [ ] Preview style variations

**Files to create:**
- `src/utils/styleDictionary.js`
- `src/utils/colorPalettes.js`
- `src/utils/detectStyle.js`
- `src/utils/suggestColors.js`
- `src/components/StyleSelector.jsx`
- `src/components/ColorPalettePicker.jsx`

---

## 📦 Phase 4 – Export System (1–2 tuần)

### ✅ Task 4.1: Export ZIP Functionality
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 10-12 hours

#### Subtasks:
- [ ] Cài đặt `jszip` và `file-saver`
- [ ] Tạo service `exportService.js`
  - [ ] Function `exportHTML(code)` - Export HTML standalone
  - [ ] Function `exportReactProject(code)` - Export React project
  - [ ] Function `exportNextJSProject(code)` - Export Next.js project
- [ ] Tạo component `ExportModal.jsx`
  - [ ] Format selection (HTML, React, Next.js)
  - [ ] Options:
    - Include TailwindCSS CDN hoặc build
    - Include sample images
    - Include fonts
  - [ ] Download button
- [ ] Generate project structure
  - [ ] HTML: `index.html`, `styles.css`, `script.js`
  - [ ] React: Full project với `package.json`, `src/`, `public/`
  - [ ] Next.js: Full Next.js project structure
- [ ] Include dependencies
  - [ ] `package.json` với dependencies
  - [ ] `README.md` với setup instructions
- [ ] ZIP file generation
  - [ ] Create ZIP với tất cả files
  - [ ] Download ZIP file

**Files to create:**
- `src/services/exportService.js`
- `src/components/ExportModal.jsx`
- `src/utils/generateProjectFiles.js`

**Dependencies to install:**
```bash
npm install jszip file-saver
```

---

### ✅ Task 4.2: Copy Code Feature
**Status**: 🔴 Pending  
**Priority**: Low  
**Estimated Time**: 2-4 hours

#### Subtasks:
- [ ] Tạo component `CopyCodeButton.jsx`
  - [ ] Button để copy code
  - [ ] Copy to clipboard functionality
  - [ ] Success feedback (toast notification)
- [ ] Copy options:
  - [ ] Copy full HTML
  - [ ] Copy CSS only
  - [ ] Copy JS only
  - [ ] Copy specific section
- [ ] Format code trước khi copy
  - [ ] Prettify HTML
  - [ ] Remove comments (optional)

**Files to create:**
- `src/components/CopyCodeButton.jsx`
- `src/utils/copyToClipboard.js`
- `src/components/Toast.jsx` (for notifications)

---

### ✅ Task 4.3: Publish System (Optional)
**Status**: 🔴 Pending  
**Priority**: Low  
**Estimated Time**: 12-16 hours

#### Subtasks:
- [ ] Setup Firebase Hosting (nếu chọn Firebase)
  - [ ] Firebase project setup
  - [ ] Firebase Hosting config
- [ ] Tạo service `publishService.js`
  - [ ] Upload files to hosting
  - [ ] Generate unique URL
  - [ ] Return publish link
- [ ] Tạo component `PublishModal.jsx`
  - [ ] Publish button
  - [ ] Loading state
  - [ ] Display published URL
  - [ ] Share button
- [ ] User authentication (nếu cần)
  - [ ] Firebase Auth hoặc custom auth
  - [ ] Save projects per user

**Files to create:**
- `src/services/publishService.js`
- `src/components/PublishModal.jsx`

**Dependencies to install:**
```bash
npm install firebase
```

---

## 🚀 Phase 5 – Advanced Features (Tùy chọn)

### ✅ Task 5.1: State Management
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 6-8 hours

#### Subtasks:
- [ ] Chọn state management solution (Zustand hoặc Redux)
- [ ] Setup store structure:
  - [ ] Current prompt
  - [ ] Generated code
  - [ ] Blocks structure
  - [ ] Editor state (selected block, preview mode...)
  - [ ] History (undo/redo)
- [ ] Create actions/reducers
- [ ] Integrate với components

**Files to create:**
- `src/store/index.js` (hoặc Zustand store)
- `src/store/slices/` (nếu dùng Redux)

**Dependencies to install:**
```bash
npm install zustand
# hoặc
npm install @reduxjs/toolkit react-redux
```

---

### ✅ Task 5.2: Undo/Redo System
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 6-8 hours

#### Subtasks:
- [ ] Implement history stack
  - [ ] Save state snapshots
  - [ ] Limit history size (50-100 steps)
- [ ] Keyboard shortcuts
  - [ ] Ctrl+Z (Undo)
  - [ ] Ctrl+Y (Redo)
- [ ] UI buttons
  - [ ] Undo button
  - [ ] Redo button
  - [ ] Disable khi không có history
- [ ] Integrate với tất cả editor actions

**Files to create:**
- `src/hooks/useHistory.js`
- `src/utils/historyManager.js`

---

### ✅ Task 5.3: Responsive Preview Modes
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 4-6 hours

#### Subtasks:
- [ ] Tạo component `PreviewModeSelector.jsx`
  - [ ] Desktop view (1920px)
  - [ ] Tablet view (768px)
  - [ ] Mobile view (375px)
- [ ] Iframe resizing
  - [ ] Set iframe width theo mode
  - [ ] Scale preview
- [ ] Visual indicators
  - [ ] Device frame (optional)
  - [ ] Size label

**Files to create:**
- `src/components/PreviewModeSelector.jsx`
- `src/hooks/usePreviewMode.js`

---

## 🎨 UI/UX Tasks

### ✅ Task UI.1: Layout & Design System
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 8-10 hours

#### Subtasks:
- [ ] Design main layout
  - [ ] Header/Navbar
  - [ ] Sidebar (optional)
  - [ ] Main content area
  - [ ] Footer
- [ ] Create design system
  - [ ] Color palette
  - [ ] Typography scale
  - [ ] Spacing system
  - [ ] Component styles
- [ ] Responsive breakpoints
- [ ] Dark mode (optional)

**Files to create:**
- `src/components/Layout.jsx`
- `src/components/Header.jsx`
- `src/styles/design-system.css`
- `tailwind.config.js` (extend với custom theme)

---

### ✅ Task UI.2: Loading States & Animations
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 4-6 hours

#### Subtasks:
- [ ] Loading spinner component
- [ ] Skeleton loaders
- [ ] Progress indicators
- [ ] Smooth transitions
- [ ] Success/Error animations

**Files to create:**
- `src/components/LoadingSpinner.jsx`
- `src/components/Skeleton.jsx`
- `src/components/ProgressBar.jsx`

---

### ✅ Task UI.3: Error Handling UI
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 4-6 hours

#### Subtasks:
- [ ] Error boundary component
- [ ] Error message display
- [ ] Retry mechanisms
- [ ] User-friendly error messages

**Files to create:**
- `src/components/ErrorBoundary.jsx`
- `src/components/ErrorMessage.jsx`

---

## 🧪 Testing Tasks

### ✅ Task TEST.1: Unit Tests
**Status**: 🔴 Pending  
**Priority**: Low  
**Estimated Time**: 8-10 hours

#### Subtasks:
- [ ] Setup testing framework (Jest + React Testing Library)
- [ ] Test utilities (parseHTML, detectIndustry...)
- [ ] Test components
- [ ] Test hooks

---

### ✅ Task TEST.2: Integration Tests
**Status**: 🔴 Pending  
**Priority**: Low  
**Estimated Time**: 6-8 hours

#### Subtasks:
- [ ] Test API integration
- [ ] Test export functionality
- [ ] Test drag & drop flow

---

## 📝 Documentation Tasks

### ✅ Task DOC.1: Code Documentation
**Status**: 🔴 Pending  
**Priority**: Low  
**Estimated Time**: 4-6 hours

#### Subtasks:
- [ ] Add JSDoc comments
- [ ] Document component props
- [ ] Document utility functions
- [ ] Create component storybook (optional)

---

## 🔧 Configuration & Setup

### ✅ Task CONFIG.1: Environment Setup
**Status**: 🔴 Pending  
**Priority**: High  
**Estimated Time**: 2-4 hours

#### Subtasks:
- [ ] Create `.env.example`
- [ ] Document environment variables
- [ ] Setup development environment
- [ ] Setup production build

---

### ✅ Task CONFIG.2: Build & Deploy
**Status**: 🔴 Pending  
**Priority**: Medium  
**Estimated Time**: 4-6 hours

#### Subtasks:
- [ ] Configure build script
- [ ] Optimize bundle size
- [ ] Setup CI/CD (optional)
- [ ] Deploy to hosting (Vercel/Netlify)

---

## 📊 Priority Summary

### 🔴 High Priority (Must Have)
1. Task 1.1: Setup Project
2. Task 1.2: Prompt Input UI
3. Task 1.3: Gemini API Integration
4. Task 1.4: Preview Iframe
5. Task 2.4: Monaco Editor
6. Task 4.1: Export ZIP

### 🟡 Medium Priority (Should Have)
1. Task 1.5: Regenerate & Refine
2. Task 2.1: Drag & Drop
3. Task 2.2: Inline Editor
4. Task 2.3: Property Editor
5. Task 3.1: Industry Detection
6. Task 3.2: Style Intelligence
7. Task 5.1: State Management

### 🟢 Low Priority (Nice to Have)
1. Task 4.2: Copy Code
2. Task 4.3: Publish System
3. Task 5.2: Undo/Redo
4. Task 5.3: Responsive Preview
5. Testing tasks
6. Documentation tasks

---

## 📅 Suggested Timeline

### Week 1-2: MVP
- Setup project
- Prompt input + Gemini API
- Preview iframe
- Regenerate feature

### Week 3-4: Basic Editor
- Drag & drop
- Inline editing
- Property panel
- Monaco editor

### Week 5-6: Intelligence
- Industry detection
- Style & color intelligence

### Week 7-8: Export & Polish
- Export ZIP
- Copy code
- UI/UX improvements
- Testing

---

## 📌 Notes

- **Start with MVP**: Focus on Phase 1 first, get it working end-to-end
- **Iterate**: Don't try to build everything at once
- **Test frequently**: Test each feature as you build it
- **User feedback**: Get feedback early and often
- **Performance**: Keep bundle size in mind, optimize images
- **Accessibility**: Consider a11y from the start

---

**Last Updated**: 2024  
**Next Review**: [Update when tasks are completed]

