import { useState } from "react";

// True ✅ [Req 1.1 & 1.2]: ประกาศ RegionFilter และใช้ Exclude<RegionFilter, "ALL"> ใน PoolNode.region ได้อย่างเฉียบคมตามหลัก DRY!
type RegionFilter = "ALL" | "ap-southeast-1" | "eu-central-1";
interface PoolNode {
  nodeId: string;
  region: Exclude<RegionFilter, "ALL">;
  activeQueries: number;
}

// True ✅ [Req 1.3]: ประกาศ INITIAL_POOL_NODES: PoolNode[] ไว้นอก Component ถูกต้อง
const INITIAL_POOL_NODES: PoolNode[] = [
  {
    nodeId: "pg-pool-sg-01",
    region: "ap-southeast-1",
    activeQueries: 35,
  },
  {
    nodeId: "pg-pool-sg-02",
    region: "ap-southeast-1",
    activeQueries: 50,
  },
  {
    nodeId: "pg-pool-eu-01",
    region: "eu-central-1",
    activeQueries: 20,
  },
];

// True ✅ [Req 2]: สร้าง Controlled Component RegionFilterBar และ RegionFilterBarProps ครบถ้วนถูกต้องโดยไม่มี State ข้างใน
interface RegionFilterBarProps {
  selectedRegion: RegionFilter;
  visibleCount: number;
  onRegionChange: (region: RegionFilter) => void;
}

function RegionFilterBar({
  selectedRegion,
  visibleCount,
  onRegionChange,
}: RegionFilterBarProps) {
  return (
    <div>
      <p>
        Active Filter: {selectedRegion} (Showing {visibleCount} nodes)
      </p>
      <button type="button" onClick={() => onRegionChange("ALL")}>
        Show All
      </button>
      <button type="button" onClick={() => onRegionChange("ap-southeast-1")}>
        Filter: ap-southeast-1
      </button>
      <button type="button" onClick={() => onRegionChange("eu-central-1")}>
        Filter: eu-central-1
      </button>
    </div>
  );
}

// True ✅ [Req 3.1]: ประกาศสัญญา PoolNodeAccordionRowProps ครบทั้ง 4 Props
interface PoolNodeAccordionRowProps {
  node: PoolNode;
  isExpanded: boolean;
  onToggleExpand: (nodeId: string) => void;
  onAddQueries: (nodeId: string) => void;
}

function PoolNodeAccordionRow({
  node,
  isExpanded,
  onToggleExpand,
  onAddQueries,
}: PoolNodeAccordionRowProps) {
  return (
    <li>
      {/* True ✅ [Req 3.2 - จุดที่ 1 (แก้ไขผ่าน 100%!)]: ข้อความใน <span> ตรงตามสเปกเรียบร้อย! */}
      <span>
        Node: {node.nodeId} | Queries: {node.activeQueries}
      </span>

      <button type="button" onClick={() => onToggleExpand(node.nodeId)}>
        {isExpanded ? "Hide Details" : "Inspect Node"}
      </button>
      {/* True ✅ [Req 3.2 - จุดที่ 2 (แก้ไขผ่าน 100%!)]: ย้ายปุ่ม Simulate +10 Queries เข้ามาอยู่ใน <div> ภายใต้เงื่อนไข isExpanded เรียบร้อย! */}
      {isExpanded && (
        <div>
          <p>Region: {node.region} | Status: SYNCHRONIZED</p>
          <button type="button" onClick={() => onAddQueries(node.nodeId)}>Simulate +10 Queries</button>
        </div>
      )}
    </li>
  );
}

export default function SynchronizedClusterDashboard(){
    // True ✅ [Req 4.1]: ประกาศ State ทั้ง 3 ตัวที่แม่ พร้อมคิด Generic Type `string | null` ของ expandedNodeId ได้ถูกต้องด้วยตัวเอง 100%!
    const [nodes, setNodes] = useState<PoolNode[]>(INITIAL_POOL_NODES);
    const [selectedRegion, setSelectedRegion] = useState<RegionFilter>("ALL");
    const [expandedNodeId, setExpandedNodeId] = useState<string | null>("pg-pool-sg-01");

    // True ✅ [Req 4.2]: คำนวณ Derived Variables (กรองโหนดตามภูมิภาค และหาผลรวม activeQueries เฉพาะโหนดที่แสดงอยู่) สดๆ ในรอบการวาดได้อย่างยอดเยี่ยม!
    const selectedRegionFiltered = nodes.filter((r) => r.region === selectedRegion || selectedRegion === "ALL");
    const activeQueries = selectedRegionFiltered.reduce((sum, node) => sum + node.activeQueries, 0);

    // True ✅ [Req 4.3 - ฟังก์ชันสลับการกางเปิด/พับปิด Accordion (แก้ไขผ่าน 100%!)]: สลับค่าระหว่าง nodeId และ null ได้อย่างถูกต้อง!
    function handleToggleExpanded(nodeId: string){
        setExpandedNodeId(prevId => prevId === nodeId ? null : nodeId);

    }

    // True ✅ [Req 4.3 - ฟังก์ชันเพิ่ม activeQueries]: อัปเดตเพิ่ม activeQueries ทีละ 10 เฉพาะโหนดเป้าหมายแบบ Immutable ได้ถูกต้อง!
    function handleAdd10Queries(nodeId: string){
        setNodes(nodes.map((n) => n.nodeId === nodeId ? ({
            ...n, activeQueries: n.activeQueries + 10
        }) : n))
    }

    // True ✅ [Req 4.4]: โครงสร้าง JSX ที่แม่และการส่ง Props + Callback ลงไปยัง RegionFilterBar และ PoolNodeAccordionRow ครบถ้วนถูกต้อง!
    return <section>
        <h2>[Synchronized PostgreSQL Read-Pool Coordinator]</h2>
        <p>
            Total Visible Queries: {activeQueries}
        </p>
        <RegionFilterBar selectedRegion={selectedRegion} visibleCount={selectedRegionFiltered.length} onRegionChange={setSelectedRegion}/>
        <ul>
            {selectedRegionFiltered.map(node => 
                <PoolNodeAccordionRow key={node.nodeId} node={node} isExpanded={expandedNodeId === node.nodeId} onAddQueries={handleAdd10Queries} onToggleExpand={handleToggleExpanded} />
            )}
        </ul>
    </section>
}
