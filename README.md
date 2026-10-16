# ⚛️ React + TypeScript + Express + PostgreSQL Practice Lab

> **Engineer:** Diw (4th-Year Computer Science Student)  
> **Tech Stack:** React (Latest) + TypeScript (`react-ts`) • Vite • Express API • PostgreSQL v18+  
> **Knowledge Base (Obsidian):** `Book of Dogskins/Lesson/React/`  
> **Curriculum Roadmap:** `Book of Dogskins/Lesson/React/roadmap.md`

---

## 📌 About This Practice Workspace (เกี่ยวกับคลังโค้ดฝึกหัดนี้)

พื้นที่นี้คือคลังโค้ดสำหรับฝึกฝนและสร้างแอปพลิเคชันจริงตามหลักสูตร **Modern Full-Stack React Architecture** แบบ **"Slow & Deep"** เน้นความเข้าใจระดับรากฐานวิทยาการคอมพิวเตอร์ (Computer Science Foundations) ควบคู่กับมาตรฐานการเขียนโค้ดจริงระดับ Production

การเรียนการสอนดำเนินควบคู่กับบันทึกทฤษฎีใน **Obsidian Vault (`Lesson/React`)** โดยใช้ระบบตรวจการบ้านแบบ **Strict Live Inline Review 100% (ผิดคือผิด ไม่หยวนคะแนน)** พร้อมปรับกรอบความคิด (Mental Model & Engineering Mindset)

---

## 📂 Project Architecture (สถาปัตยกรรมและการจัดสรรโฟลเดอร์)

โค้ดทั้งหมดถูกจัดวางในโปรเจกต์ `my-react-app` โดยใช้ระบบ **2-Tier Modular Workshop Architecture** เพื่อให้โค้ดของแต่ละหัวข้อไม่ทับกัน และสามารถย้อนกลับมาทบทวนคอมเมนต์ตรวจการบ้าน (`True ✅ / False ❌`) ได้ตลอดเวลา:

```text
React-tutorial/
├── README.md                                  # เอกสารอธิบายภาพรวมของ Workspace นี้
└── my-react-app/                              # โปรเจกต์หลัก (Vite + React + TypeScript)
    ├── public/                                # Static Assets ที่เสิร์ฟตรงจาก Root URL
    ├── src/
    │   ├── assets/                            # มีเดีย/รูปภาพที่ผ่านการ Bundle และทำ Cache Hashing
    │   ├── modules/                           # 📦 ศูนย์รวมโค้ดแยกตามบทเรียน
    │   │   ├── module-1-fundamentals/         # บทที่ 1: React Fundamentals
    │   │   │   ├── exercises/                 # 🛠️ Tier 1: โฟลเดอร์แบบฝึกหัดย่อยรายหัวข้อ
    │   │   │   │   ├── ex-1.1.1-vite-setup/   # Workshop 1.1.1: SystemBootCard & TS Setup
    │   │   │   │   ├── ex-1.1.x-.../          # (หัวข้อถัดไป: Props, Lists, State, Form)
    │   │   │   │   └── ...
    │   │   │   └── mini-project/              # 🏆 Tier 2: โปรเจกต์ท้ายบทที่ 1 (Capstone)
    │   │   ├── module-2-advanced-react/       # บทที่ 2: Advanced React (Hooks, APIs)
    │   │   └── ...
    │   ├── App.tsx                            # Root Showcase Component (ใช้สลับแสดงผล Exercise ปัจจุบัน)
    │   ├── main.tsx                           # React Entry Point (createRoot + StrictMode)
    │   ├── index.css                          # Global Styling
    │   └── App.css                            # Component Styling
    ├── package.json                           # Scripts & Dependencies
    ├── tsconfig.app.json                      # Strict TypeScript Configuration (Frontend)
    ├── eslint.config.js                       # ESLint Config (React Hooks & Refresh Rules)
    └── vite.config.ts                         # Vite Bundler & Plugins Configuration
```

---

## 🛠️ Essential Commands & Development Workflow

คำสั่งมาตรฐานที่ใช้ในโฟลเดอร์ `my-react-app`:

```bash
# เข้าสู่โฟลเดอร์โปรเจกต์
cd my-react-app

# 1. รัน Dev Server พร้อมระบบ Hot Module Replacement (HMR)
npm run dev

# 2. ตรวจสอบคุณภาพโค้ดและกฎของ React Hooks (ต้องไม่มี Warning/Error ก่อนส่งงาน)
npm run lint

# 3. ตรวจสอบความถูกต้องของ Type ทั่วทั้งโปรเจกต์
npx tsc -b

# 4. ทดสอบ Build โปรเจกต์สำหรับ Production
npm run build
```

---

## ⚖️ Mentorship & Review Standards (มาตรฐานการตรวจโค้ด)

ทุกแบบฝึกหัดและโปรเจกต์ในคลังนี้ถูกตรวจทานด้วยเกณฑ์ระดับเข้มงวด:
1. **Zero Raw Code / No Spoon-Feeding:** ผู้เรียนเป็นผู้ออกแบบโครงสร้าง Type, Function, และ Logic เองจาก Requirements Checklist
2. **Strict Live Inline Review:** ทำการตรวจสอบโค้ดจริงในไฟล์ พร้อมใส่ Inline Comment:
   - `// True ✅: ...` ผ่านตามเกณฑ์สเปก
   - `// False ❌: ...` ไม่ตรงตามสเปก พร้อมอธิบาย 2 มิติเสมอ (มิติที่ 1: ความเป็นไปได้ใน Production จริง และ มิติที่ 2: จุดที่ต้องปรับแก้ให้ตรงตาม Spec)
3. **Continuous Refinement:** ทฤษฎีและแนวคิดที่ค้นพบระหว่างการทำแบบฝึกหัดจะถูกนำกลับไปอัปเดตและเสริมในบันทึก Obsidian ทันที

---

## 🗺️ Master Curriculum Overview (ภาพรวมบทเรียน)

| Module | เนื้อหาหลัก | โฟลเดอร์โค้ด | สถานะ |
|:---:|---|---|:---:|
| **0** | **Before You Start React:** DOM, JS Closures, Async/Await, ES6+, TS Essentials | - | 📖 Reference |
| **1** | **React Fundamentals:** Components, JSX/TSX, Props, State, Lists, `useState`, Forms, `useReducer`, Context API | `src/modules/module-1-fundamentals/` | 🟡 In Progress |
| **2** | **Advanced React:** `useRef`, `useEffect`, Cleanup, `useMemo`, `useCallback`, Custom Hooks, API Integration | `src/modules/module-2-advanced-react/` | ⏳ Pending |
| **3** | **Advanced State Management:** Redux Toolkit, Zustand, Jotai, Recoil, MobX | `src/modules/module-3-state-management/` | ⏳ Pending |
| **4** | **Styling Solutions:** Tailwind CSS, CSS Modules, Styled Components, Shadcn UI | `src/modules/module-4-styling/` | ⏳ Pending |
| **5** | **React Ecosystem:** React Router, Axios, Suspense, Infinite Scroll, React Hook Form, Testing | `src/modules/module-5-ecosystem/` | ⏳ Pending |
| **6** | **React Frameworks:** Next.js (App Router, RSC, Server Actions), Remix | `src/modules/module-6-frameworks/` | ⏳ Pending |
| **7** | **Beyond React:** Software Engineering Excellence, Clean Code, Architecture | `src/modules/module-7-beyond-react/` | ⏳ Pending |
| **8** | **Backend Integration:** Express API (TypeScript) + PostgreSQL v18+ Database | `src/modules/module-8-backend-integration/` | ⏳ Pending |
