// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.1.7 — PureMetricsDashboard.tsx)
// - Req 1 (Data Model Interface & Immutable Static Array): True ✅ (ประกาศ ServiceMetric และ INITIAL_METRICS ถูกต้อง และไม่ใช้ let หรือแก้ไขค่าต้นฉบับ)
// - Req 2 (Pure Sub-Component #1 — DashboardSummaryHeader): True ✅ (แยก Component ส่วนหัวและรับ Props ตรงตามสัญญา 100%)
// - Req 3 (Pure Sub-Component #2 — ServiceRankRow): False ❌ (สะกดชื่อพร็อพใน ServiceRankRowProps ผิดจาก 'metric' เป็น 'matric')
// - Req 4 (Main Component with Non-Mutating Sort): False ❌ (1. ใน <h3> ลืมเครื่องหมายโคลอน ':' ปิดท้าย, 2. ส่งพร็อพชื่อ matric={item} แทนที่จะเป็น metric={item})
// - Req 5 (Integration in App.tsx & Zero Lint/Type Errors): True ✅ (ผ่าน npm run lint และ npx tsc -b 100%)
// ============================================================================

// True ✅ [Req 1 - Part 1]: ประกาศ Interface ServiceMetric ครบถ้วนถูกต้อง
interface ServiceMetric {
  serviceId: string;
  serviceName: string;
  memoryMb: number;
}

// True ✅ [Req 1 - Part 2 & 3]: ประกาศอาเรย์ค่าคงที่ INITIAL_METRICS นอกฟังก์ชัน และรักษาความบริสุทธิ์ (Immutability) 100%
const INITIAL_METRICS: ServiceMetric[] = [
  { serviceId: "srv-a", serviceName: "API-Gateway", memoryMb: 512 },
  { serviceId: "srv-b", serviceName: "Postgres-Primary", memoryMb: 2048 },
  { serviceId: "srv-c", serviceName: "Redis-Cache", memoryMb: 256 },
];

// True ✅ [Req 2 - Part 1]: ประกาศ Interface DashboardSummaryHeaderProps ถูกต้อง
interface DashboardSummaryHeaderProps {
  clusterName: string;
  totalServices: number;
}

// True ✅ [Req 2 - Part 2]: แยก Pure Sub-Component DashboardSummaryHeader ได้สะอาดและตรงสเปก 100%
function DashboardSummaryHeader({
  clusterName,
  totalServices,
}: DashboardSummaryHeaderProps) {
  return (
    <header>
      <h2>[Pure Metrics]: {clusterName}</h2>
      <p>Monitored Services: {totalServices}</p>
    </header>
  );
}

interface ServiceRankRowProps {
  rank: number;
  // False ❌ [Req 3 - Prop Contract Typo]: สเปกกำหนดให้ชื่อคีย์คือ 'metric: ServiceMetric' (สะกดด้วยตัว e)
  // แต่ในโค้ดสะกดเป็น 'matric' (ตัว a) แก้เป็น: metric: ServiceMetric;
  metric: ServiceMetric;
}

// False ❌ [Req 3 - Prop Destructuring Typo]: เปลี่ยนจาก { rank, matric } เป็น { rank, metric } ให้ตรงตามสัญญา Interface
function ServiceRankRow({ rank, metric }: ServiceRankRowProps) {
  return (
    // True ✅ [Req 3 - Output Format]: รูปแบบข้อความ "#{rank} {metric.serviceName} - {metric.memoryMb}MB" ถูกต้องและคลีนมาก (ไม่มี key ติดมาใน <li> แล้ว เยี่ยมมาก!)
    <li>
      #{rank} {metric.serviceName} - {metric.memoryMb}MB
    </li>
  );
}

export default function PureMetricsDashboard() {
  // True ✅ [Req 4 - Part 1 (Non-Mutating Sort)]: ใช้ [...INITIAL_METRICS] คัดลอกอาเรย์ก้อนใหม่ก่อนเรียก .sort() เรียงจากมากไปน้อย ยอดเยี่ยมมาก!
  const rankedByMemory = [...INITIAL_METRICS].sort(
    (a, b) => b.memoryMb - a.memoryMb
  );

  return (
    <section>
      {/* True ✅ [Req 4 - Header Invocation]: เรียกใช้ DashboardSummaryHeader พร้อมส่ง Props ถูกต้อง */}
      <DashboardSummaryHeader
        clusterName="Production Microservices"
        totalServices={INITIAL_METRICS.length}
      />
      {/* False ❌ [Req 4 - Missing Trailing Colon]: สเปกกำหนดให้มีเครื่องหมาย ':' ปิดท้ายข้อความใน <h3> */}
      {/* แก้เป็น: <h3>Memory Leaderboard (High to Low):</h3> */}
      <h3>Memory Leaderboard (High to Low):</h3>
      <ol>
        {rankedByMemory.map((item, index) => (
          // True ✅ [Req 4 - Key & Rank Calculation]: วาง key={item.serviceId} ที่ <ServiceRankRow /> และคำนวณ rank={index + 1} ถูกต้องเป๊ะ!
          // False ❌ [Req 4 - Prop Name Typo]: เมื่อแก้ ServiceRankRowProps แล้ว ให้เปลี่ยนชื่อพร็อพตรงนี้จาก matric={item} เป็น metric={item} ด้วยครับ
          <ServiceRankRow
            rank={index + 1}
            metric={item}
            key={item.serviceId}
          />
        ))}
      </ol>
      {/* True ✅ [Req 4 - Unmutated Proof]: พิสูจน์ความบริสุทธิ์ของ INITIAL_METRICS[0].serviceName ได้ผลลัพธ์เป็น API-Gateway ถูกต้อง 100% */}
      <p>
        Original First Service (Unmutated): {INITIAL_METRICS[0].serviceName}
      </p>
    </section>
  );
}