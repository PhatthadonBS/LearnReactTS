// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.1.2 — RenderPipelineInspector.tsx)
// - Req 1 (Union Literal Type & Interface): True ✅ (แก้คีย์เป็น 'engineName' ตรงสเปก 100%)
// - Req 2 (Static Constant Outside Component): True ✅ (วางนอกฟังก์ชันถูกต้อง และคีย์ตรงสเปกครบถ้วน)
// - Req 3 (Child Sub-Component & Parent Tree): True ✅ (โครงสร้าง <section> -> <MemoryComparisonBanner /> (<aside>) และข้อความถูกต้องเป๊ะ)
// - Req 5 (Zero Lint & Type Errors): True ✅ (ผ่าน npm run lint และ npx tsc -b 100%)
// ============================================================================

// True ✅ [Req 1 - Part 1]: ประกาศ Union Literal Type ถูกต้อง 100%
type PipelinePhase = "TRIGGER" | "RENDER" | "COMMIT";

// True ✅ [Req 1 - Part 2]: ประกาศ Interface EngineSpec ครบทั้ง 5 คีย์ ตรงสเปก 100%
interface EngineSpec {
  engineName: string;
  diffComplexity: string;
  activePhase: PipelinePhase;
  virtualDomNodes: number;
  realDomMutations: number;
}

// True ✅ [Req 2]: วางตัวแปรค่าคงที่ไว้นอกฟังก์ชัน Component ถูกต้องตามหลัก Memory Optimization และกำหนดค่าตรงสเปกเป๊ะ!
const engin: EngineSpec = {
  engineName: "React Fiber Reconciler",
  diffComplexity: "O(n) Heuristic",
  activePhase: "COMMIT",
  virtualDomNodes: 128,
  realDomMutations: 1,
};

// True ✅ [Req 3 - Part 1]: แยก Component ย่อย MemoryComparisonBanner คืนค่า <aside> และแสดงผลข้อความตรงสเปก 100%
function MemoryComparisonBanner() {
  return (
    <aside>
      Memory Nodes: {engin.virtualDomNodes} VDOM vs {engin.realDomMutations}{" "}
      Real DOM Mutation
    </aside>
  );
}

// True ✅ [Req 3 - Part 2]: Component หลักคืนค่า <section> พร้อม <h2>, <p> 2 แท็ก และเรียกใช้ <MemoryComparisonBanner /> ด้านล่างสุดถูกต้อง
// 💡 Tailwind Tip: ลองเพิ่ม className ตกแต่ง <section> และ <aside> ให้สวยงามเข้าชุดกับ SystemBootCard ได้เลยครับ!
export default function RenderPipelineInspector() {
  return (
    <section>
      <h2>[Pipeline Inspector]: {engin.engineName}</h2>
      <p>Algorithm Complexity: {engin.diffComplexity}</p>
      <p>Current Phase: {engin.activePhase}</p>
      <MemoryComparisonBanner />
    </section>
  );
}
