// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.2.3 — BatchQueueSimulator.tsx) [100% PASSED ✅]
// - Req 1 (Component State Declarations with Explicit Generics): True ✅ (ประกาศ activePods และ lastSnapshotLog พร้อมระบุ <number> และ <string> ถูกต้อง 100%)
// - Req 2 (Queued State Updates with Updater Functions & Snapshot Proof): True ✅ (บันทึก Snapshot ก่อนอัปเดต และใช้ Updater Function เข้าคิวทั้งแบบ +1 และ +3 ถูกต้องเป๊ะ!)
// - Req 3 (Semantic HTML Structure & Rendered Output): True ✅ (โครงสร้างแท็กและข้อความที่แสดงผลตรงสเปก 100%)
// - Req 4 (Integration in App.tsx & Zero Lint/Type Errors): True ✅ (ผ่าน npm run lint และ npx tsc -b 100%)
// ============================================================================

import { useState } from "react";

export default function BatchQueueSimulator() {
  // True ✅ [Req 1]: ประกาศ State ทั้ง 2 ตัวพร้อมระบุ TypeScript Generic Type <number> และ <string> ครบถ้วนถูกต้อง
  const [activePods, setActivePods] = useState<number>(2);
  const [lastSnapshotLog, setLastSnapshotLog] = useState<string>(
    "No scaling action yet",
  );

  // True ✅ [Req 2.1]: บันทึกค่า Snapshot ของรอบปัจจุบันลง lastSnapshotLog และใช้ Updater Function บวกเพิ่ม 1
  function handleScaleUpSingle() {
    setLastSnapshotLog(`Snapshot before render: ${activePods} pods`);
    setActivePods((prevAP) => prevAP + 1);
  }

  // True ✅ [Req 2.2]: บันทึกค่า Snapshot และส่ง Updater Function เข้าคิว 3 คำสั่งเรียงกัน ได้ผลลัพธ์ +3 ในคลิกเดียว!
  function handleScaleUpTripleBurst() {
    setLastSnapshotLog(`Snapshot before render: ${activePods} pods`);
    setActivePods((prevAP) => prevAP + 1);
    setActivePods((prevAP) => prevAP + 1);
    setActivePods((prevAP) => prevAP + 1);
  }

  // True ✅ [Req 2.3]: รีเซ็ตทั้ง activePods และ lastSnapshotLog กลับสู่ค่าเริ่มต้นถูกต้อง
  function handleResetCluster() {
    setActivePods(2);
    setLastSnapshotLog("No scaling action yet");
  }

  return (
    <section>
      {/* True ✅ [Req 3.1 & 3.2]: แสดงหัวข้อ <h2> และจำนวน activePods ใน <p> ถูกต้อง */}
      <h2>[Kubernetes Autoscaler Snapshot Lab]</h2>
      <p>Active Worker Pods: {activePods}</p>
      {/* True ✅ [Req 3.3]: แสดงผลข้อความตรงตามสเปก 100%! */}
      {/* 💡 [Senior Engineering Tip — ไม่ต้องเขียน Ternary ซ้ำซ้อนเมื่อค่าเริ่มต้นของ State ตรงอยู่แล้ว]:
          สังเกตว่าตอนเริ่มต้น (บรรทัดที่ 13) และตอนกดปุ่ม Reset (บรรทัดที่ 34) ค่าของตัวแปร `lastSnapshotLog` มีค่าเป็น `"No scaling action yet"` อยู่แล้วครับ!
          ดังนั้น เราสามารถเขียนแค่บรรทัดเดียวว่า:
          <p>Last Render Snapshot: {lastSnapshotLog}</p>
          ได้เลยโดยไม่ต้องเช็ก `activePods === 2 ? ... : ...` ซึ่งทำให้โค้ดสั้นลงและรองรับกรณีที่อนาคตมีปุ่มลดจำนวน Pod ลงกลับมาเหลือ 2 ด้วยครับ! */}
      {activePods === 2 ? (
        <p>Last Render Snapshot: No scaling action yet</p>
      ) : (
        <p>Last Render Snapshot: {lastSnapshotLog}</p>
      )}
      {/* True ✅ [Req 3.4]: ปุ่มกดทั้ง 3 ปุ่มระบุ type="button" และผูก Event Handler ครบถ้วนถูกต้อง */}
      <div>
        <button type="button" onClick={handleScaleUpSingle}>
          Scale +1 Pod
        </button>
        <button type="button" onClick={handleScaleUpTripleBurst}>
          Burst +3 Pods (Queued)
        </button>
        <button type="button" onClick={handleResetCluster}>
          Reset Cluster
        </button>
      </div>
    </section>
  );
}
