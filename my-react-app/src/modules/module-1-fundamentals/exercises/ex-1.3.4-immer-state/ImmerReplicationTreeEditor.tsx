import { useState } from "react";
import { useImmerReducer } from "use-immer";

// True ✅ [Req 1.1 & 1.2]: ประกาศ interface StandbyNode และ ReplicationClusterTree ที่ซ้อนกัน 3 ชั้นครบทุกคีย์และชนิดข้อมูล!
interface StandbyNode {
  nodeId: string;
  syncPriority: number;
  walReceiverActive: boolean;
}

interface ReplicationClusterTree {
  clusterId: string;
  failoverPolicy: {
    autoPromote: boolean;
    timeoutConfig: {
      heartbeatIntervalSec: number;
      maxRetryCount: number;
    };
  };
  standbyNodes: StandbyNode[];
}

// True ✅ [Req 1.3]: ประกาศ Discriminated Union Type ชื่อ ReplicationTreeAction ครบทั้ง 5 รูปแบบ!
type ReplicationTreeAction =
  | { type: "toggle_auto_promote" }
  | { type: "increase_max_retries" }
  | { type: "toggle_wal_receiver"; targetNodeId: string }
  | { type: "register_standby_node"; newNodeId: string }
  | { type: "reset_tree" };

// True ✅ [Req 1.4]: ประกาศ INITIAL_CLUSTER_TREE: ReplicationClusterTree ไว้นอกฟังก์ชัน Component ถูกต้อง!
const INITIAL_CLUSTER_TREE: ReplicationClusterTree = {
  clusterId: "pg-ha-cluster-01",
  failoverPolicy: {
    autoPromote: true,
    timeoutConfig: {
      heartbeatIntervalSec: 5,
      maxRetryCount: 3,
    },
  },
  standbyNodes: [
    {
      nodeId: "standby-sg-01",
      syncPriority: 1,
      walReceiverActive: true,
    },
    {
      nodeId: "standby-jp-01",
      syncPriority: 2,
      walReceiverActive: false,
    },
  ],
};

function replicationTreeImmerReducer(
  draft: ReplicationClusterTree,
  action: ReplicationTreeAction,
) {
  switch (action.type) {
    // True ✅ [Req 2.1]: แก้ไข draft.failoverPolicy.autoPromote โดยตรงบน draft ได้อย่างกระชับ!
    case "toggle_auto_promote": {
      draft.failoverPolicy.autoPromote = !draft.failoverPolicy.autoPromote;
      break;
    }

    // True ✅ [Req 2.2]: แก้ไขข้อมูลที่ซ้อนลึก 3 ชั้น (draft.failoverPolicy.timeoutConfig.maxRetryCount++) โดยไม่ต้องทำ Spread Hell!
    case "increase_max_retries": {
      draft.failoverPolicy.timeoutConfig.maxRetryCount++;
      break;
    }

    // True ✅ [Req 2.3 - แก้ไขผ่าน 100%!]: แยกการค้นหาด้วย .find() ออกจากการแก้ไขค่า target.walReceiverActive ได้อย่างถูกต้องสมบูรณ์!
    case "toggle_wal_receiver": {
      const target = draft.standbyNodes.find((item) => item.nodeId === action.targetNodeId);
      if (target) { target.walReceiverActive = !target.walReceiverActive; }
      break;
    }

    // True ✅ [Req 2.4]: ใช้ draft.standbyNodes.push(...) เพิ่มโหนดใหม่พร้อมคำนวณ syncPriority ได้ถูกต้อง!
    case "register_standby_node": {
      draft.standbyNodes.push({
        nodeId: action.newNodeId,
        syncPriority: draft.standbyNodes.length + 1,
        walReceiverActive: true,
      });
      break;
    }
    // True ✅ [Req 2.5]: คืนค่า INITIAL_CLUSTER_TREE เพื่อรีเซ็ตทั้งก้อนได้ถูกต้อง!
    case "reset_tree": {
      return INITIAL_CLUSTER_TREE;
    }
  }
}

export default function ImmerReplicationTreeEditor() {
  // True ✅ [Req 3.1 & 3.2]: เรียกใช้ useImmerReducer และจัดการ handleRegStandby (พร้อม .trim() ก่อนเช็กและส่ง) ได้ไร้ที่ติ!
  const [tree, dispatch] = useImmerReducer(
    replicationTreeImmerReducer,
    INITIAL_CLUSTER_TREE,
  );
  const [nodeIdInput, setNodeIdInput] = useState("");

  function handleRegStandby() {
    const nodeId = nodeIdInput.trim();
    if (nodeId.length === 0) return;

    dispatch({ type: "register_standby_node", newNodeId: nodeId });
    setNodeIdInput("");
  }

  return (
    <section>
      <h2>[PostgreSQL Immer Replication Tree Editor]</h2>
      <p>
        {tree.failoverPolicy.autoPromote
          ? `Cluster: ${tree.clusterId} | Auto-Promote: ENABLED`
          : `Cluster: ${tree.clusterId} | Auto-Promote: DISABLED`}
      </p>
      <p>
        Heartbeat: {tree.failoverPolicy.timeoutConfig.heartbeatIntervalSec}s |
        Max Retries: {tree.failoverPolicy.timeoutConfig.maxRetryCount}
      </p>
      <div>
        <input
          type="text"
          placeholder="New standby ID (e.g. standby-us-01)"
          value={nodeIdInput}
          onChange={(e) => setNodeIdInput(e.target.value)}
        />
        <button type="button" onClick={handleRegStandby}>Register Standby</button>
        <button type="button" onClick={() => dispatch({type: "toggle_auto_promote"})}>Toggle Auto-Promote</button>
        <button type="button" onClick={() => dispatch({type: "increase_max_retries"})}>Increase Max Retries (+1)</button>
        <button type="button" onClick={() => dispatch({type: "reset_tree"})}>Reset Tree</button>
      </div>

      <ul>
        {tree.standbyNodes.map(item => <li key={item.nodeId}>
            {/* True ✅ [Req 3.3 - แก้ไขผ่าน 100%!]: ใช้ค่าจาก item.syncPriority และ item.nodeId แสดงผลตรงตามสเปกเรียบร้อย! */}
            <span>{`[Priority #${item.syncPriority}] Node: ${item.nodeId} | WAL Receiver: ${item.walReceiverActive ? "STREAMING" : "STOPPED"}`}</span>
            <button type="button" onClick={() => dispatch({type: "toggle_wal_receiver", targetNodeId: item.nodeId})}>Toggle WAL</button>
        </li>)}
      </ul>
    </section>
  );
}
