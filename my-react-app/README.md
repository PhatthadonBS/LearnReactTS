# 🚀 my-react-app (Modern React + TypeScript Lab)

> Practice workspace for **Modern React (Latest) + TypeScript (`react-ts`) + Vite**  
> Mentorship project for **Diw (CS Year 4)**  
> Main Practice Root Documentation: [../README.md](../README.md)  
> Obsidian Curriculum: `Book of Dogskins/Lesson/React/roadmap.md`

---

## 📁 Directory Structure & Convention

โปรเจกต์นี้ใช้โครงสร้าง **Modular Architecture** เพื่อเก็บแบบฝึกหัดย่อยและโปรเจกต์ท้ายบทแยกกันอย่างเป็นระเบียบ:

```text
src/
├── assets/                       # Image and media assets
├── modules/                      # Modular curriculum workspaces
│   ├── module-1-fundamentals/    # Module 1
│   │   ├── exercises/            # Topic micro-challenges
│   │   │   └── ex-1.1.1-vite-setup/
│   │   └── mini-project/         # End-of-module capstone project
│   ├── module-2-advanced-react/  # Module 2
│   └── ...
├── App.tsx                       # Active component switcher/showcase
├── main.tsx                      # Application entry point
├── index.css                     # Global styles
└── App.css                       # App styles
```

---

## ⚡ Available Scripts

In the `my-react-app` directory, you can run:

| Command | Description | Purpose |
|---|---|---|
| `npm run dev` | Runs the app in development mode with HMR (`http://localhost:5173`) | Active coding & preview |
| `npm run lint` | Runs ESLint over all `.ts` and `.tsx` files | Code quality & Hooks verification |
| `npx tsc -b` | Checks TypeScript compilation without emitting output | Strict type contract verification |
| `npm run build` | Compiles and bundles the application to `dist/` | Production build validation |
| `npm run preview` | Locally preview the production build in `dist/` | Production sanity check |

---

## 🎯 How to Showcase Current Exercise

เมื่อทำแบบฝึกหัดย่อยเสร็จใน `src/modules/module-X-.../exercises/ex-...`:
1. เปิดไฟล์ `src/App.tsx`
2. Import คอมโพเนนต์ของหัวข้อนั้นเข้ามาแสดงผล
3. รัน `npm run lint` และ `npx tsc -b` เพื่อตรวจทานความถูกต้องก่อนส่งตรวจ
