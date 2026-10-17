import "./App.css";
import SystemBootCard from "./modules/module-1-fundamentals/exercises/ex-1.1.1-vite-setup/SystemBootCard";
import RenderPipelineInspector from "./modules/module-1-fundamentals/exercises/ex-1.1.2-render-tree/RenderPipelineInspector";

function App() {
  return (
    // True ✅ [Req 4]: มี <main> ครอบชั้นนอกสุดเพียงตัวเดียว, <h1>React Mentorship Lab</h1> ตรงสเปกเป๊ะ, และเรียง Component ถูกต้อง!
    <main className="w-full h-full bg-slate-100 p-20">
      <h1>React Mentorship Lab</h1>
      <SystemBootCard />
      <RenderPipelineInspector />
    </main>
  );
}

export default App;
