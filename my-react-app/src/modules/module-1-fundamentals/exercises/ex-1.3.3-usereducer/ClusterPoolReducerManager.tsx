import { useReducer, useState } from "react";

// True ✅ [Req 1.1 & 1.2]: ประกาศ interface WorkerProcess และ PoolManagerState ครบทุกคีย์และชนิดข้อมูลตามสัญญา!
interface WorkerProcess {
  pid: number;
  clientIp: string;
  status: "ACTIVE" | "IDLE";
}

interface PoolManagerState {
  maxPoolSize: number;
  emergencyLockdown: boolean;
  workers: WorkerProcess[];
}

// True ✅ [Req 1.3]: ประกาศ Discriminated Union Type ชื่อ PoolAction ครบทั้ง 5 รูปแบบอย่างแม่นยำ!
type PoolAction =
  | { type: "spawn_worker"; clientIp: string }
  | { type: "toggle_worker_status"; targetPid: number }
  | { type: "terminate_idle_workers" }
  | { type: "toggle_lockdown" }
  | { type: "reset_pool" };

// True ✅ [Req 1.4]: ประกาศค่าคงที่ INITIAL_POOL_STATE: PoolManagerState ไว้นอก Component ถูกต้อง!
const INITIAL_POOL_STATE: PoolManagerState = {
  maxPoolSize: 10,
  emergencyLockdown: false,
  workers: [
    { pid: 1001, clientIp: "10.0.1.15", status: "ACTIVE" },
    { pid: 1002, clientIp: "10.0.1.22", status: "IDLE" },
    { pid: 1003, clientIp: "10.0.2.88", status: "ACTIVE" },
  ],
};

// True ✅ [Req 2]: เขียน Pure Reducer Function `poolReducer` แยกไว้นอก Component และจัดการทั้ง 5 เหตุการณ์แบบ Immutable ได้สมบูรณ์แบบ 100%!
function poolReducer(
  state: PoolManagerState,
  action: PoolAction,
): PoolManagerState {
  switch (action.type) {
    case "spawn_worker": {
      if (
        state.emergencyLockdown ||
        state.workers.length >= state.maxPoolSize
      ) {
        return state;
      }
      const newWork: WorkerProcess = {
        pid: state.workers.length + 1001,
        clientIp: action.clientIp,
        status: "ACTIVE",
      };

      return { ...state, workers: [...state.workers, newWork] };
    }
    case "toggle_worker_status": {
      return {
        ...state,
        workers: state.workers.map((prevWork) =>
          prevWork.pid === action.targetPid
            ? {
                ...prevWork,
                status: prevWork.status === "ACTIVE" ? "IDLE" : "ACTIVE",
              }
            : prevWork,
        ),
      };
    }
    case "terminate_idle_workers": {
      return {
        ...state,
        workers: state.workers.filter(
          (prevWork) => prevWork.status === "ACTIVE",
        ),
      };
    }

    case "toggle_lockdown": {
      return { ...state, emergencyLockdown: !state.emergencyLockdown };
    }

    case "reset_pool": {
      return INITIAL_POOL_STATE;
    }
  }
}

export default function ClusterPoolReducerManager() {
  // True ✅ [Req 3.1]: เรียกใช้งาน useReducer คู่กับ poolReducer และ INITIAL_POOL_STATE พร้อมประกาศ useState สำหรับ ipInput ถูกต้อง
  // 💡 Senior Coaching Tip: สามารถระบุ Generic Type `useState<string>("")` เพื่อความชัดเจนสม่ำเสมอได้ครับ
  const [state, dispatch] = useReducer(poolReducer, INITIAL_POOL_STATE);
  const [ipInput, setIpInput] = useState("");
  function handleSpawnWorker() {
    if (ipInput.trim().length <= 0) return;
    // False ❌ [Req 3.2 - ส่งค่า ipInput ที่ยังไม่ได้ตัดช่องว่างหัวท้ายเข้า dispatch]:
    // - สเปกกำหนดว่า: "ให้เรียก dispatch ส่งเหตุการณ์ 'spawn_worker' พร้อมส่งค่า ipInput ที่ตัดช่องว่างหัวท้ายแล้วเข้าไป"
    // - ในบรรทัดที่ 93 ดิวใช้ `.trim()` ตอนเช็กความยาวแล้ว แต่พอบรรทัดที่ 98 กลับส่ง `clientIp: ipInput` (ตัวแปรดิบที่ยังไม่ได้ `.trim()`) เข้าไปแทน!
    // - หากผู้ใช้เผลอพิมพ์เว้นวรรคนำหน้าหรือต่อท้าย เช่น `"  10.0.1.99  "` ค่าใน State จะมีช่องว่างติดไปด้วย!
    // - วิธีแก้: เปลี่ยนเป็น `dispatch({ type: "spawn_worker", clientIp: ipInput.trim() });` (หรือเก็บ `const trimmedIp = ipInput.trim();` ไว้ใช้ทั้งตอนเช็กและตอนส่ง) ครับ!
    dispatch({ type: "spawn_worker", clientIp: ipInput.trim() });
    setIpInput("");
  }

  // True ✅ [Req 3.3]: โครงสร้าง Semantic HTML (<section>, <h2>, <p>, <div>, <input>, <button>, <ul>/<li>) และการส่ง dispatch ตรงตามสเปก 100%!
  return (
    <section>
      <h2>[PostgreSQL Worker Pool Reducer Engine]</h2>
      <p>
        {state.emergencyLockdown
          ? `Pool Capacity: ${state.workers.length} / ${state.maxPoolSize} | Security: LOCKDOWN ACTIVE`
          : `Pool Capacity: ${state.workers.length} / ${state.maxPoolSize} | Security: NORMAL`}
      </p>
      <div>
        <input
          type="text"
          placeholder="Client IP (e.g. 10.0.1.99)"
          value={ipInput}
          onChange={(e) => setIpInput(e.target.value)}
        />
        <button type="button" onClick={handleSpawnWorker}>
          Spawn Worker
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "terminate_idle_workers" })}
        >
          Terminate All IDLE
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "toggle_lockdown" })}
        >
          Toggle Lockdown
        </button>
        <button type="button" onClick={() => dispatch({ type: "reset_pool" })}>
          Reset Pool
        </button>
      </div>

      <ul>
        {state.workers.map((item) => (
          <li key={item.pid}>
            <span>
              PID: {item.pid} | IP: {item.clientIp} | Status: {item.status}
            </span>
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "toggle_worker_status", targetPid: item.pid })
              }
            >
              Switch Status
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
