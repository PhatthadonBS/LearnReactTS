import { useState } from "react";

// True ✅ [Req 1.1]: ประกาศ interface PostgresClusterConfig ที่มีโครงสร้าง Nested Object 2 ชั้นถูกต้องครบทุกคีย์และชนิดข้อมูล!
interface PostgresClusterConfig {
  instanceName: string;
  readOnlyMode: boolean;
  poolSettings: {
    maxConnections: number;
    statementTimeoutMs: number;
  };
}

// True ✅ [Req 1.2]: ประกาศค่าคงที่ DEFAULT_PG_CONFIG ไว้นอก Component พร้อมระบุ Type PostgresClusterConfig ถูกต้อง!
const DEFAULT_PG_CONFIG: PostgresClusterConfig = {
  instanceName: "pg-prod-master",
  readOnlyMode: false,
  poolSettings: {
    maxConnections: 100,
    statementTimeoutMs: 5000,
  },
};

export default function PostgresConfigEditor() {
  // True ✅ [Req 2.1]: ประกาศ State config, setConfig ด้วย useState<PostgresClusterConfig>(DEFAULT_PG_CONFIG) ที่ระดับบนสุดถูกต้อง!
  const [config, setConfig] =
    useState<PostgresClusterConfig>(DEFAULT_PG_CONFIG);

  // True ✅ [Req 2.2 - ฟังก์ชันที่ 1]: อัปเดต instanceName แบบ Immutable ด้วย Object Spread (...prev) พร้อมระบุชนิด React.ChangeEvent<HTMLInputElement> ถูกต้อง!
  function onInstanceNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfig((prev) => ({ ...prev, instanceName: e.target.value }));
  }

  // True ✅ [Req 2.2 - ฟังก์ชันที่ 2]: สลับค่า readOnlyMode แบบ Immutable ด้วย !prev.readOnlyMode ถูกต้อง!
  function toggleReadOnlyMode() {
    setConfig((prev) => ({ ...prev, readOnlyMode: !prev.readOnlyMode }));
  }

  // True ✅ [Req 2.2 - ฟังก์ชันที่ 3]: อัปเดต Nested Object (poolSettings.maxConnections) แบบ Immutable ทั้ง 2 ชั้น (...prev และ ...prev.poolSettings) ไร้ที่ติ!
  function boostMaxConnections() {
    setConfig((prev) => ({
      ...prev,
      poolSettings: {
        ...prev.poolSettings,
        maxConnections: prev.poolSettings.maxConnections + 50,
      },
    }));
  }

  // True ✅ [Req 2.2 - ฟังก์ชันที่ 4]: รีเซ็ต State กลับไปยัง DEFAULT_PG_CONFIG ได้อย่างปลอดภัย เพราะตลอดการทำงานเราไม่เคย Mutate ก้อน DEFAULT_PG_CONFIG เลย!
  function resetToDefault() {
    setConfig(DEFAULT_PG_CONFIG);
  }

  // True ✅ [Req 3]: โครงสร้าง Semantic HTML (<section>, <h2>, <div>, <label>, <input>, <p>, <button type="button">) และข้อความที่แสดงผลตรงตาม Spec 100%!
  return (
    <section>
      <h2>[PostgreSQL v18 Config Editor]</h2>
      <div>
        <label htmlFor="pg-instance-input">Instance Name:</label>
        <input
          type="text"
          id="pg-instance-input"
          value={config.instanceName}
          onChange={onInstanceNameChange}
        />
      </div>
      <p>
        Instance: {config.instanceName} | Mode:{" "}
        {config.readOnlyMode ? "READ-ONLY" : "READ-WRITE"}
      </p>
      <p>
        Connection Pool: Max {config.poolSettings.maxConnections} conns |
        Timeout: {config.poolSettings.statementTimeoutMs}ms
      </p>
      <div>
        <button type="button" onClick={toggleReadOnlyMode}>Toggle Read-Only Mode</button>
        <button type="button" onClick={boostMaxConnections}>Boost Max Connections (+50)</button>
        <button type="button" onClick={resetToDefault}>Reset to Default</button>
      </div>
    </section>
  );
}
