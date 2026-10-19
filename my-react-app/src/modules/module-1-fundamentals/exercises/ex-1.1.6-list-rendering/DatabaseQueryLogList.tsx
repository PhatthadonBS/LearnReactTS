// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.1.6 — DatabaseQueryLogList.tsx) [UPDATED: 100% PASSED ✅]
// - Req 1 (Data Model Interface & Static Array): True ✅ (ประกาศ QueryLogEntry และ QUERY_LOGS ถูกต้อง 100%)
// - Req 2 (Child List Item Component & Props Contract): True ✅ (แก้ไขโดยลบ key ออกจาก <li> และเติมเว้นวรรคหลัง ':' ใน <strong> เรียบร้อยแล้ว!)
// - Req 3 (Array Filtering & Keyed List Rendering): True ✅ (แก้ไขใช้ QUERY_LOGS.length ใน <h2>, ย้าย <h3> ออกนอก <ul>, และใส่ key={item.queryId} ที่ <QueryLogItem /> ครบทั้ง 2 จุดแล้ว!)
// - Req 4 (Integration in App.tsx & Zero Lint/Type Errors): True ✅ (ผ่าน npm run lint และ npx tsc -b 100%)
// ============================================================================

// True ✅ [Req 1 - Part 1]: ประกาศ Interface QueryLogEntry ครบถ้วนถูกต้อง
interface QueryLogEntry {
  queryId: string;
  sqlCommand: string;
  executionTimeMs: number;
  isSlowQuery: boolean;
}

// True ✅ [Req 1 - Part 2]: ประกาศอาเรย์ค่าคงที่ QUERY_LOGS: QueryLogEntry[] ไว้นอกฟังก์ชัน Component ถูกต้อง
const QUERY_LOGS: QueryLogEntry[] = [
  {
    queryId: "q-101",
    sqlCommand: "SELECT * FROM users WHERE id = 1",
    executionTimeMs: 4,
    isSlowQuery: false,
  },
  {
    queryId: "q-102",
    sqlCommand: "SELECT * FROM orders JOIN items",
    executionTimeMs: 850,
    isSlowQuery: true,
  },
  {
    queryId: "q-103",
    sqlCommand: "UPDATE inventory SET stock = 0",
    executionTimeMs: 12,
    isSlowQuery: false,
  },
  {
    queryId: "q-104",
    sqlCommand: "DELETE FROM audit_logs WHERE year < 2020",
    executionTimeMs: 1420,
    isSlowQuery: true,
  },
];

// True ✅ [Req 2 - Part 1]: ประกาศ QueryLogItemProps รับ entry: QueryLogEntry ถูกต้อง
interface QueryLogItemProps {
  entry: QueryLogEntry;
}

// True ✅ [Req 2 - Part 2]: ฟังก์ชันลูกสะอาด คลีน ไม่มี key ปะปนใน <li> และรูปแบบข้อความตรงสเปก 100%
function QueryLogItem({ entry }: QueryLogItemProps) {
  return (
    <li>
      <strong>
        [{entry.queryId}]: {entry.sqlCommand}
      </strong>
      <span> - Time: {entry.executionTimeMs}ms</span>
    </li>
  );
}

export default function DatabaseQueryLogList() {
  // True ✅ [Req 3 - Part 1]: คัดกรองเฉพาะรายการที่ isSlowQuery เป็นจริงด้วย .filter() ได้ถูกต้องและคลีนมาก!
  const slowQueries: QueryLogEntry[] = QUERY_LOGS.filter(
    (item) => item.isSlowQuery
  );

  return (
    <section>
      {/* True ✅ [Req 3 - Part 2]: แสดงจำนวนทั้งหมดด้วย QUERY_LOGS.length ถูกต้อง */}
      <h2>
        [PostgreSQL Query Inspector]: Total {QUERY_LOGS.length} Queries
      </h2>
      <h3>All Executed Queries: </h3>
      <ul>
        {QUERY_LOGS.map((item) => (
          // True ✅ [Req 3 - Key Placement]: ระบุ key={item.queryId} ที่ <QueryLogItem /> ใน .map() ถูกต้องตามกฎ Fiber Reconciliation
          <QueryLogItem entry={item} key={item.queryId} />
        ))}
      </ul>
      {/* True ✅ [Req 3 - Semantic HTML]: วาง <h3> ไว้นอก <ul> ถูกต้องตามมาตรฐาน W3C */}
      <h3>Slow Queries Detected ({slowQueries.length}):</h3>
      <ul>
        {slowQueries.map((item) => (
          // True ✅ [Req 3 - Key Placement]: ระบุ key={item.queryId} ที่ <QueryLogItem /> ใน .map() ก้อนที่สองถูกต้อง
          <QueryLogItem entry={item} key={item.queryId} />
        ))}
      </ul>
    </section>
  );
}