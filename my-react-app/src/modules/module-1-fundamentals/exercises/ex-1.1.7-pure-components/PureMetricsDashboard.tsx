// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.1.7 — PureMetricsDashboard.tsx) [UPDATED: 100% PASSED ✅]
// - Req 1 (Data Model Interface & Immutable Static Array): True ✅ (ประกาศ ServiceMetric และ INITIAL_METRICS ถูกต้อง และไม่ใช้ let หรือแก้ไขค่าต้นฉบับ)
// - Req 2 (Pure Sub-Component #1 — DashboardSummaryHeader): True ✅ (แยก Component ส่วนหัวและรับ Props ตรงตามสัญญา 100%)
// - Req 3 (Pure Sub-Component #2 — ServiceRankRow): True ✅ (แก้ไขตัวสะกดพร็อพเป็น 'metric' ตรงตามสัญญา 100% แล้ว!)
// - Req 4 (Main Component with Non-Mutating Sort): True ✅ (แก้ไขเติม ':' ปิดท้ายใน <h3> และส่งพร็อพ metric={item} ครบถ้วนถูกต้องแล้ว!)
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

// True ✅ [Req 3 - Part 1]: ประกาศ ServiceRankRowProps ใช้ชื่อคีย์ metric: ServiceMetric ถูกต้อง
interface ServiceRankRowProps {
  rank: number;
  metric: ServiceMetric;
}

// True ✅ [Req 3 - Part 2]: รับ Props { rank, metric } และแสดงผล <li> ตรงสเปก 100%
function ServiceRankRow({ rank, metric }: ServiceRankRowProps) {
  return (
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
      {/* True ✅ [Req 4 - Subheading]: ข้อความใน <h3> มี ':' ปิดท้ายตรงตามสเปก 100% */}
      <h3>Memory Leaderboard (High to Low):</h3>
      <ol>
        {rankedByMemory.map((item, index) => (
          // True ✅ [Req 4 - Key & Props]: วาง key={item.serviceId}, คำนวณ rank={index + 1}, และส่ง metric={item} ถูกต้องครบถ้วน!
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