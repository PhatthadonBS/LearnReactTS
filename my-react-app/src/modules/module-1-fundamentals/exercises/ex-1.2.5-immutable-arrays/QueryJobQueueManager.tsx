import { useState } from "react";

// True ✅ [Req 1.1]: ประกาศ interface QueryJob ครบทั้ง 4 คีย์ตามสัญญา (jobId, sqlQuery, priority, isPaused)
interface QueryJob {
  jobId: string;
  sqlQuery: string;
  priority: number;
  isPaused: boolean;
}

// True ✅ [Req 1.2]: ประกาศตัวแปรค่าคงที่ INITIAL_JOBS: QueryJob[] ไว้นอกฟังก์ชัน Component พร้อมข้อมูลเริ่มต้นครบถ้วน
const INITIAL_JOBS: QueryJob[] = [
  {
    jobId: "job-101",
    sqlQuery: "VACUUM ANALYZE orders;",
    priority: 20,
    isPaused: false,
  },
  {
    jobId: "job-102",
    sqlQuery: "REINDEX TABLE users;",
    priority: 50,
    isPaused: true,
  },
  {
    jobId: "job-103",
    sqlQuery: "REFRESH MATERIALIZED VIEW daily_sales;",
    priority: 10,
    isPaused: false,
  },
];

export default function QueryJobQueueManager() {
  // True ✅ [Req 2.1]: ประกาศ State ทั้ง 3 ตัว (jobs, newSqlQuery, newPriority) พร้อมระบุ Explicit Generic Type และค่าเริ่มต้นถูกต้อง
  const [jobs, setJobs] = useState<QueryJob[]>(INITIAL_JOBS);
  const [newSqlQuery, setNewSqlQuery] = useState<string>("");
  const [newPriority, setNewPriority] = useState<number>(30);

  function enqueueJob() {
    if (newSqlQuery.trim().length === 0) return;
    // False ❌ [Req 2.2 - การทำงานที่ 1 (jobId Generation)]:
    // 1. สเปกกำหนดให้ตั้งค่า jobId เป็น `"job-"` ต่อท้ายด้วยจำนวนสมาชิกปัจจุบันของ `jobs` บวก `101` (`job-${jobs.length + 101}`)
    // 2. อันตรายร้ายแรงใน Production (Runtime Crash & Duplicate Key Bug):
    //    - กรณีที่ 1: หากผู้ใช้กดปุ่ม Cancel Job ลบงานในคิวจนหมด (`jobs.length === 0`) แล้วกด Enqueue Job คำสั่ง `jobs[jobs.length - 1]` จะได้ `undefined` และเกิด Runtime Crash (`TypeError: Cannot read properties of undefined (reading 'jobId')`) หน้าเว็บพังทันที!
    //    - กรณีที่ 2: หากผู้ใช้กดปุ่ม `Sort by Priority (High to Low)` ลำดับสุดท้ายในอาเรย์จะกลายเป็น `job-103` (Priority 10) หรือถ้าเพิ่ม `job-104` (Priority 99) แล้วกด Sort ตัวสุดท้ายจะยังเป็น `job-103` พอกดเพิ่มงานใหม่อีกครั้งจะสร้าง `job-104` ซ้ำ! ทำให้ React Key ซ้ำกัน!
    const newJob: QueryJob = {
      jobId: `job-${jobs.length + 101}`,
      sqlQuery: newSqlQuery.trim(),
      priority: newPriority,
      isPaused: false,
    };
    // True ✅ [Req 2.2 - การทำงานที่ 1 (Immutable Append & Reset)]: ใช้ Spread `[...job, newJob]` ต่อท้ายอาเรย์เดิมแบบ Immutable และรีเซ็ตฟอร์มกลับเป็นค่าเริ่มต้นถูกต้อง
    setJobs((job) => [...job, newJob]);
    setNewSqlQuery("");
    setNewPriority(30);
  }

  // True ✅ [Req 2.2 - การทำงานที่ 2 (Immutable Update with .map)]: ใช้ .map() ร่วมกับ `{ ...job, isPaused: !job.isPaused }` สลับค่าเฉพาะตัวที่ตรงกับ targetJobId ได้อย่างถูกต้อง
  function togglePaused(targetJobId: string) {
    setJobs((prev) =>
      prev.map((job) =>
        job.jobId === targetJobId ? { ...job, isPaused: !job.isPaused } : job,
      ),
    );
  }

  // True ✅ [Req 2.2 - การทำงานที่ 3 (Immutable Remove with .filter)]: ใช้ .filter() คัดเฉพาะงานที่ `job.jobId !== targetJobId` ได้ถูกต้อง
  function deleteJob(targetJobId: string) {
    setJobs((prev) => prev.filter((job) => job.jobId !== targetJobId));
  }

  // True ✅ [Req 2.2 - การทำงานที่ 4 (Immutable Sort)]: คัดลอกอาเรย์ใหม่ด้วย `[...job]` ก่อนเรียก `.sort((a, b) => b.priority - a.priority)` เพื่อเรียงจากมากไปน้อยโดยไม่แก้ไขอาร์เรย์ต้นฉบับ!
  function sortJobs() {
    setJobs((job) => [...job].sort((a, b) => b.priority - a.priority));
  }

  return (
    <section>
      {/* True ✅ [Req 3.1 - 3.3]: โครงสร้าง <h2>, <div> ฟอร์ม Controlled Inputs + ปุ่มกด, และ <p> แสดงจำนวนงาน ตรงตามสเปก */}
      <h2>[PostgreSQL Background Job Queue]</h2>
      <div>
        <input
          type="text"
          placeholder="Enter SQL command"
          value={newSqlQuery}
          onChange={(input) => setNewSqlQuery(input.target.value)}
        />
        <input
          type="number"
          value={newPriority}
          onChange={(input) => setNewPriority(Number(input.target.value))}
        />
        <button type="button" onClick={enqueueJob}>
          Enqueue Job
        </button>
        <button type="button" onClick={sortJobs}>
          Sort by Priority (High to Low)
        </button>
      </div>
      <p>Total Queued Jobs: {jobs.length}</p>
      <ul>
        {jobs.map((job) => (
          <li key={job.jobId}>
            {/* False ❌ [Req 3.4 - Inverted Boolean Logic]: สลับเงื่อนไข Ternary ของ `job.isPaused` กลับด้าน!
                - สเปกกำหนดว่า: ถ้า `job.isPaused` เป็นจริง (`true` = ถูกหยุดชั่วคราว) ต้องแสดง `PAUSED` และถ้าเป็นเท็จ (`false` = ไม่ได้ถูกหยุด) ต้องแสดง `RUNNING`
                - แต่โค้ดนี้เขียน `job.isPaused ? "RUNNING" : "PAUSED"` ทำให้พอ `isPaused` เป็น `true` กลับแสดงว่า `RUNNING`!
                - วิธีแก้: เปลี่ยนเป็น `{job.isPaused ? "PAUSED" : "RUNNING"}` */}
            <span>
              [{job.jobId}] Priority: {job.priority} | SQL: {job.sqlQuery} | Status: {job.isPaused ? "PAUSED" : "RUNNING"}
            </span>
            <button type="button" onClick={() => togglePaused(job.jobId)}>Toggle Pause</button>
            <button type="button" onClick={() => deleteJob(job.jobId)}>Cancel Job</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
