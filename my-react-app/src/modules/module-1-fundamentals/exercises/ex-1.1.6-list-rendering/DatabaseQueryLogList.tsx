// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.1.6 — DatabaseQueryLogList.tsx)
// - Req 1 (Data Model Interface & Static Array): True ✅ (ประกาศ QueryLogEntry และ QUERY_LOGS ถูกต้อง 100%)
// - Req 2 (Child List Item Component & Props Contract): False ❌ (วาง key={entry.queryId} ผิดที่! ห้ามวางที่ <li> ข้างในลูก และลืมเว้นวรรคหลัง ':' ใน <strong>)
// - Req 3 (Array Filtering & Keyed List Rendering): False ❌ (1. ใน <h2> ใช้ slowQueries.length แทนที่จะเป็น QUERY_LOGS.length, 2. วาง <h3> ตัวที่สองไว้ข้างใน <ul> ตัวแรก, 3. ลืมใส่ key={item.queryId} ที่ <QueryLogItem /> ใน .map() ทั้ง 2 จุด)
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

function QueryLogItem({ entry }: QueryLogItemProps) {
  // False ❌ [Req 2 - Misplaced Key]: ห้ามใส่ key={entry.queryId} ที่แท็ก <li> ข้างในฟังก์ชันลูก!
  // เพราะคนที่เรียก .map() คือ DatabaseQueryLogList ดังนั้นต้องย้าย key ไปใส่ที่ <QueryLogItem key={item.queryId} entry={item} /> ตอนทำ .map() เสมอ!
  return (
    <li>
      {/* False ❌ [Req 2 - Missing Space]: หลังเครื่องหมายโคลอน ':' ต้องมีเว้นวรรค 1 เคาะตามสเปก "[q-101]: SELECT ..." */}
      {/* แก้เป็น: <strong>[{entry.queryId}]: {entry.sqlCommand}</strong> */}
      <strong>
        [{entry.queryId}]: {entry.sqlCommand}
      </strong>
      {/* True ✅ [Req 2 - Span Format]: รูปแบบ " - Time: 4ms" ถูกต้องเป๊ะ */}
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
      {/* False ❌ [Req 3 - Wrong Array Length]: สเปกกำหนดให้แสดงจำนวนทั้งหมดใน QUERY_LOGS (Total 4 Queries) */}
      {/* แต่ในโค้ดใช้ slowQueries.length จึงแสดงเป็น Total 2 Queries! แก้เป็น: {QUERY_LOGS.length} */}
      <h2>
        [PostgreSQL Query Inspector]: Total {QUERY_LOGS.length} Queries
      </h2>
      <h3>All Executed Queries: </h3>
      <ul>
        {QUERY_LOGS.map((item) => (
          // False ❌ [Req 3 - Missing Key in .map()]: ต้องใส่ key={item.queryId} ที่แท็ก <QueryLogItem /> ตรงนี้!
          <QueryLogItem entry={item} key={item.queryId} />
        ))}
        {/* False ❌ [Req 3 - Invalid HTML Nesting]: เผลอวาง <h3> ไว้ข้างในแท็ก <ul> ตัวแรก! */}
        {/* ต้องย้ายบรรทัด <h3>Slow Queries Detected...</h3> ออกไปวางนอกแท็กปิด </ul> ตัวแรกครับ */}
      </ul>
        <h3>Slow Queries Detected ({slowQueries.length}):</h3>
      <ul>
        {slowQueries.map((item) => (
          // False ❌ [Req 3 - Missing Key in .map()]: ต้องใส่ key={item.queryId} ที่แท็ก <QueryLogItem /> ตรงนี้ด้วย!
          <QueryLogItem entry={item} key={item.queryId} />
        ))}
      </ul>
    </section>
  );
}