// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.1.4 — ClusterNodePropsLab.tsx)
// - Req 1 (Wrapper Component & children: ReactNode): True ✅ (รับและแสดงผล children ภายใน <section> -> <div> ถูกต้อง 100%)
// - Req 2 (Child Card Interface with Optional Prop): True ✅ (ประกาศ NodeSpecCardProps พร้อม region?: string ครบถ้วน)
// - Req 3 (Child Card Component & Default Value): True ✅ (ทำ Object Destructuring พร้อมกำหนด Default Value ให้ region ถูกต้องเป๊ะ)
// - Req 4 (Main Component Composition & Reusability): True ✅ (ส่ง Props ทั้ง 2 ใบถูกต้อง และทดสอบการละ region ในใบที่ 2 สำเร็จ)
// - Req 5 (Integration in App.tsx & Zero Lint/Type Errors): True ✅ (ผ่าน npm run lint และ npx tsc -b 100%)
// ============================================================================

// True ✅ [Req 1 - Part 1]: นำเข้าชนิดข้อมูล ReactNode ด้วย import type ถูกต้องตามหลัก TypeScript
import type { ReactNode } from "react";

// True ✅ [Req 1 - Part 2]: ประกาศสัญญา Props สำหรับ Wrapper Component ครบถ้วน
interface ClusterRackWrapperProps {
  rackTitle: string;
  children: ReactNode;
}

// True ✅ [Req 2]: ประกาศสัญญา NodeSpecCardProps พร้อมกำหนด region?: string เป็น Optional Prop ถูกต้อง 100%
interface NodeSpecCardProps {
  nodeId: string;
  cpuCores: number;
  region?: string;
  isHealthy: boolean;
}

// True ✅ [Req 1 - Part 3]: สร้าง Wrapper Component แกะกล่อง { children, rackTitle } และวาง {children} ใน <div> ถูกต้อง
function ClusterRackWrapper({ children, rackTitle }: ClusterRackWrapperProps) {
  return (
    <section>
      <h2>[Cluster Rack]: {rackTitle}</h2>
      <div>{children}</div>
    </section>
  );
}

// True ✅ [Req 3]: แกะกล่อง Props พร้อมกำหนด Default Value (region = "ap-southeast-1") และแสดงผล <h3>, <p> ทั้ง 2 แท็กตรงสเปกเป๊ะ
function NodeSpecCard({
  nodeId,
  cpuCores,
  isHealthy,
  region = "ap-southeast-1",
}: NodeSpecCardProps) {
  return (
    <article>
      <h3>
        Node: {nodeId} ({region})
      </h3>
      <p>Allocated Cores: {cpuCores} vCPU</p>
      <p>Health Status: {isHealthy ? "HEALTHY" : "DEGRADED"}</p>
    </article>
  );
}

// True ✅ [Req 4]: ประกอบร่าง <ClusterRackWrapper> สอดไส้ <NodeSpecCard /> 2 ใบได้ถูกต้อง 100%
// 💡 Pro Tip: ในใบที่ 1 ที่เขียนแค่ `isHealthy` (Boolean Shorthand) ตัว TSX Compiler จะแปลงให้เป็น `isHealthy={true}` อัตโนมัติ ซึ่งเป็นท่าที่นิยมใช้ในงาน Production จริงครับ!
export default function ClusterNodePropsLab() {
  return (
    <ClusterRackWrapper rackTitle="Production PostgreSQL v18 Cluster">
      <NodeSpecCard
        nodeId="pg-primary-01"
        cpuCores={32}
        region="us-west-2"
        isHealthy
      />
      <NodeSpecCard nodeId="pg-replica-02" cpuCores={16} isHealthy={false} />
    </ClusterRackWrapper>
  );
}
