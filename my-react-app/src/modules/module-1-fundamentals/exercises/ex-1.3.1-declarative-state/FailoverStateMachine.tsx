import { useState } from "react";

// True ✅ [Req 1.1]: ประกาศ Union Type FailoverStage ครบทั้ง 4 สถานะ ("monitoring" | "promoting" | "completed" | "aborted") ป้องกัน Impossible States ได้ 100%!
type FailoverStage = "monitoring" | "promoting" | "completed" | "aborted";
// True ✅ [Req 1.2]: ประกาศ interface ReplicaNode ครบทุกคีย์ตามสัญญา
interface ReplicaNode {
  nodeId: string;
  region: string;
  replicationLagMs: number;
}

// True ✅ [Req 1.3]: ประกาศค่าคงที่ INITIAL_REPLICAS: ReplicaNode[] ไว้นอกฟังก์ชัน Component ถูกต้อง
const INITIAL_REPLICAS: ReplicaNode[] = [
  {
    nodeId: "pg-replica-sg",
    region: "ap-southeast-1",
    replicationLagMs: 120,
  },
  {
    nodeId: "pg-replica-jp",
    region: "ap-northeast-1",
    replicationLagMs: 45,
  },
  {
    nodeId: "pg-replica-eu",
    region: "eu-central-1",
    replicationLagMs: 210,
  },
];

export default function FailoverStateMachine() {
  // True ✅ [Req 2.1]: ประกาศ useState เพียง 3 ตัวตามหลัก Minimal State Structure (ไม่มี Redundant / Contradictory / Duplicated State เลย!)
  const [stage, setStage] = useState<FailoverStage>("monitoring");
  const [replicas, setReplicas] = useState<ReplicaNode[]>(INITIAL_REPLICAS);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("pg-replica-sg");

  // True ✅ [Req 2.2]: คำนวณ Derived Variables สดๆ ในรอบการวาดด้วย .find() และ .filter().length
  // 💡 Senior Coaching Tip: ในบรรทัดที่ 39 แนะนำให้ใช้เครื่องหมาย Strict Equality (`===`) แทน Loose Equality (`==`) เสมอใน TypeScript/JavaScript (`node.nodeId === selectedNodeId`) เพื่อป้องกันการแปลงชนิดข้อมูลอัตโนมัติ (Type Coercion)
  const selectedNode = replicas.find((node) => node.nodeId == selectedNodeId);
  const lagLower100 = replicas.filter(
    (item) => item.replicationLagMs < 100,
  ).length;

  // True ✅ [Req 2.3]: อัปเดตลดค่า replicationLagMs เฉพาะโหนดที่เลือกแบบ Immutable ด้วย .map() และป้องกันค่าติดลบด้วย Math.max(0, ...)
  // 💡 Senior Coaching Tip: สามารถใช้ Updater Function `setReplicas((prev) => prev.map(...))` เพื่อรับประกันว่าได้อาเรย์ล่าสุดในคิวเสมอครับ
  function reduceSelectedLag() {
    setReplicas((prev) =>
      prev.map((item) =>
        item.nodeId === selectedNodeId
          ? {
              ...item,
              replicationLagMs: Math.max(0, item.replicationLagMs - 30),
            }
          : item,
      ),
    );
  }

  function changeStage(stage: FailoverStage) {
    setStage(stage);
  }

  function resetStage() {
    setStage("monitoring");
  }

  // True ✅ [Req 3]: โครงสร้าง Semantic HTML (<section>, <h2>, <p>, <ul>/<li>, <div>, <button type="button">) และข้อความที่แสดงผลตรงตาม Spec 100%!
  return (
    <section>
      <h2>[PostgreSQL Failover State Machine]</h2>

      <p>
        {stage === "monitoring"
          ? "Stage: MONITORING — Cluster health is normal."
          : stage === "promoting"
            ? "Stage: PROMOTING — Promoting selected replica to primary..."
            : stage === "completed"
              ? "Stage: COMPLETED — Failover succeeded!"
              : "Stage: ABORTED — Failover cancelled. Rolled back to safe state."}
      </p>

      <p>
        Healthy Replicas (Lag &lt; 100ms): {lagLower100} / {replicas.length}
      </p>
      <ul>
        {replicas.map((item) => (
          <li key={item.nodeId}>
            <span>
              Node: {item.nodeId} ({item.region}) — Lag: {item.replicationLagMs}
              ms
            </span>
            <button
              type="button"
              onClick={() => setSelectedNodeId(item.nodeId)}
            >
              {selectedNodeId === item.nodeId
                ? "Selected Target"
                : "Select Target"}
            </button>
          </li>
        ))}
      </ul>
      <p>
        Target Inspector: {selectedNode?.nodeId} | Current Lag:{" "}
        {selectedNode?.replicationLagMs}ms
      </p>
      <div>
        <button type="button" onClick={reduceSelectedLag}>
          Reduce Selected Lag (-30ms)
        </button>
        <button type="button" onClick={() => changeStage("promoting")}>
          Start Failover
        </button>
        <button type="button" onClick={() => changeStage("completed")}>
          Confirm Promotion
        </button>
        <button type="button" onClick={() => changeStage("aborted")}>
          Abort Failover
        </button>
        <button type="button" onClick={resetStage}>
          Reset State Machine
        </button>
      </div>
    </section>
  );
}
