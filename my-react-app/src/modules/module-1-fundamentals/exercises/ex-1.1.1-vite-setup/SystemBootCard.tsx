interface SystemBootConfig {
  studentName: string;
  academicYear: number;
  // True ✅ [Req 2]: แก้เป็น 'currentModule' (camelCase) ตรงตามสเปกเรียบร้อยแล้ว
  currentModule: string;
  isEngineReady: boolean;
}

// True ✅ [Req 2 & Memory Optimization]: ย้าย bootConfig ออกมานอกฟังก์ชัน Component ทำให้จอง Memory แค่ครั้งเดียว!
const bootConfig: SystemBootConfig = {
  studentName: "Diw",
  academicYear: 4,
  currentModule: "Module 1: React Fundamentals",
  isEngineReady: true,
};

export default function SystemBootCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white">
        [System Boot]: {bootConfig.currentModule}
      </h2>
      <p className="mt-2 text-slate-300">
        Engineer: {bootConfig.studentName} (CS Year {bootConfig.academicYear})
      </p>
      <p className="mt-1 font-mono text-emerald-400">
        Engine Status: {bootConfig.isEngineReady ? "ONLINE" : "OFFLINE"}
      </p>
    </div>
  );
}
