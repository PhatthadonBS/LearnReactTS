// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.2.1 — ClusterCommandPanel.tsx) [100% PASSED ✅]
// - Req 1 (Child Component & Callback Prop Contract — NodeActionRow): True ✅ (ประกาศ NodeActionRowProps, ผูก onClick ที่ <div>, และใช้ e.stopPropagation() ที่ปุ่มลูกถูกต้อง 100%)
// - Req 2 (Main Component & Form Submission Guard — ClusterCommandPanel): True ✅ (ใช้ React.SubmitEvent<HTMLFormElement>, e.preventDefault(), และข้อความใน console.log ตรงสเปกทุกตัวอักษร!)
// - Req 3 (Integration in App.tsx & Zero Lint/Type Errors): True ✅ (ผ่าน npm run lint และ npx tsc -b 100%)
// ============================================================================

// True ✅ [Req 1 - Part 1]: ประกาศสัญญา NodeActionRowProps ครบทั้ง 3 คีย์ และระบุ Function Type (nodeName: string) => void ถูกต้องเป๊ะ
interface NodeActionRowProps {
  nodeName: string;
  onInspect: (nodeName: string) => void;
  onForceReboot: (nodeName: string) => void;
}

// True ✅ [Req 1 - Part 2]: แยก Component ลูกพร้อมจัดการ Event Bubbling ได้อย่างถูกต้องตามหลักวิศวกรรม
function NodeActionRow({
  nodeName,
  onInspect,
  onForceReboot,
}: NodeActionRowProps) {
  // True ✅ [Req 1 - Propagation Guard]: รับ e: React.MouseEvent<HTMLButtonElement> สั่ง e.stopPropagation() ก่อนเรียก onForceReboot(nodeName) ยอดเยี่ยมมาก!
  function handleBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    onForceReboot(nodeName);
  }

  return (
    // True ✅ [Req 1 - Row Click]: ใช้ Inline Arrow Function เพื่อส่ง nodeName กลับไปให้ onInspect เมื่อคลิกที่แถว
    <div onClick={() => onInspect(nodeName)}>
      <span>Node: {nodeName} (Click row to inspect)</span>
      <button type="button" onClick={handleBtn}>
        Force Reboot
      </button>
    </div>
  );
}

export default function ClusterCommandPanel() {
  // True ✅ [Req 2 - Part 1]: ฟังก์ชันแสดงข้อความ [INSPECT] และ [REBOOT] ตรงตามสเปก 100%
  // 💡 [Senior Engineering Tip #1]: ในฟังก์ชัน Event Handler ที่คืนค่าเป็น void เราไม่จำเป็นต้องเขียนคำว่า `return` หน้า `console.log(...)` ครับ เขียนแค่ `console.log(...)` เฉยๆ ได้เลย!
  function detail(nodeName: string) {
    return console.log(`[INSPECT]: Opening telemetry for ${nodeName}`);
  }

  function forceReboot(nodeName: string) {
    return console.log(`[REBOOT]: Sending SIGTERM to ${nodeName}`);
  }

  // True ✅ [Req 2 - Form Submit Handler]: ใช้ React.SubmitEvent<HTMLFormElement> (มาตรฐาน React 19.2+ ล่าสุด) และเรียก e.preventDefault() ถูกต้อง 100%!
  function handleBroadcastSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    return console.log("[BROADCAST]: Cluster-wide health check initiated");
  }

  return (
    <section>
      <h2>[Cluster Command Center]</h2>
      {/* True ✅ [Req 2 - Part 2]: วาง <NodeActionRow /> ทั้ง 2 แถวและทำงานได้ถูกต้อง 100%! */}
      {/* 💡 [Senior Engineering Tip #2 — ลดการสร้าง Arrow Function ซ้ำซ้อน]:
          สังเกตว่าข้างใน NodeActionRow (บรรทัดที่ 25 และ 30) ลูกเป็นคนเรียก `onInspect(nodeName)` และ `onForceReboot(nodeName)` โดยส่ง `nodeName` กลับมาให้แม่อยู่แล้ว!
          ดังนั้น ในแม่เราสามารถส่งที่อยู่ฟังก์ชันไปตรงๆ ได้เลยโดยไม่ต้องห่อ `() => ...` ซ้ำอีกครั้ง:
          <NodeActionRow nodeName="pg-primary-01" onInspect={detail} onForceReboot={forceReboot} />
          ซึ่งช่วยลดการพิมพ์ชื่อโหนดซ้ำ 3 รอบ และไม่ต้องสร้าง Arrow Function ก้อนใหม่ใน Heap Memory ด้วยครับ! */}
      <NodeActionRow
        nodeName="pg-primary-01"
        onInspect={() => detail("pg-primary-01")}
        onForceReboot={() => forceReboot("pg-primary-01")}
      />
      <NodeActionRow
        nodeName="redis-sentinel-01"
        onInspect={() => detail("redis-sentinel-01")}
        onForceReboot={() => forceReboot("redis-sentinel-01")}
      />
      {/* True ✅ [Req 2 - Form Element]: ผูก onSubmit={handleBroadcastSubmit} และปุ่ม type="submit" ถูกต้อง */}
      <form onSubmit={handleBroadcastSubmit}>
        <button type="submit">Run Cluster Health Check</button>
      </form>
    </section>
  );
}
