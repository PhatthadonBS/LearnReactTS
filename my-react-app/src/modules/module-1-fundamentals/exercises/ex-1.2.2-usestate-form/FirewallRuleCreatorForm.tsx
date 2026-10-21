// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.2.2 — FirewallRuleCreatorForm.tsx) [UPDATED: 100% PASSED ✅]
// - Req 1 (Component State Declarations with Explicit Generics): True ✅ (แก้ไขระบุ <string>, <string>, และ <number> ครบทั้ง 3 ตัวแล้ว!)
// - Req 2 (Typed Event Handlers & Form Reset Logic): True ✅ (แก้ไขเติม setRuleName("") หลังบันทึก และแยกฟังก์ชัน onRuleNameChange / onProtocolChange พร้อมระบุชนิด React.ChangeEvent<...> ถูกต้องครบถ้วน!)
// - Req 3 (Controlled Form Structure & Live Preview): True ✅ (แก้ไขเติม "Protocol:" ใน <label>, เรียงลำดับ <option> เป็น TCP -> UDP -> ICMP, และเช็ก ruleName.trim().length === 0 ถูกต้อง 100%!)
// - Req 4 (Integration in App.tsx & Zero Lint/Type Errors): True ✅ (ผ่าน npm run lint และ npx tsc -b 100%)
// ============================================================================

import React, { useState } from "react";

export default function FirewallRuleCreatorForm() {
  // True ✅ [Req 1]: ประกาศ State ทั้ง 3 ตัวพร้อมระบุ TypeScript Generic Type ครบถ้วนถูกต้อง
  const [ruleName, setRuleName] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("TCP");
  const [savedCount, setSavedCount] = useState<number>(0);

  // True ✅ [Req 2.4]: จัดการ onSubmit พร้อม e.preventDefault(), เช็ก .trim(), เพิ่ม savedCount, console.log, และล้างค่า setRuleName("") ครบถ้วน
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (ruleName.trim().length === 0) return;

    setSavedCount((count) => count + 1);
    console.log(`[FIREWALL SAVED]: Rule ${ruleName} (Protocol: ${protocol})`);
    setRuleName("");
  }

  // True ✅ [Req 2.3]: ล้างค่า ruleName เป็น "" และรีเซ็ต protocol เป็น "TCP" โดยไม่แตะต้อง savedCount
  function resetHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setRuleName("");
    setProtocol("TCP");
  }

  // True ✅ [Req 2.1]: แยกฟังก์ชันรับ React.ChangeEvent<HTMLInputElement> ชัดเจน ไม่เกิด Variable Shadowing แล้ว!
  function onRuleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRuleName(e.target.value);
  }

  // True ✅ [Req 2.2]: แยกฟังก์ชันรับ React.ChangeEvent<HTMLSelectElement> ชัดเจน
  function onProtocolChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setProtocol(e.target.value);
  }

  return (
    <section>
      {/* True ✅ [Req 3.1]: แสดงผลหัวข้อและ savedCount ตรงตามสเปก */}
      <h2>[Firewall Rule Creator] - Saved Rules: {savedCount}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rule-name-input">
            Rule Name:{" "}
            <input
              id="rule-name-input"
              type="text"
              value={ruleName}
              onChange={onRuleNameChange}
            />
          </label>
        </div>
        <div>
          {/* True ✅ [Req 3.2]: เติมข้อความ "Protocol:" และเรียงลำดับ TCP -> UDP -> ICMP ถูกต้อง */}
          <label htmlFor="protocol-select">
            Protocol:
            <select
              id="protocol-select"
              value={protocol}
              onChange={onProtocolChange}
            >
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
              <option value="ICMP">ICMP</option>
            </select>
          </label>
        </div>
        <button type="submit">Save Rule</button>
        <button type="button" onClick={resetHandler}>
          Reset Draft
        </button>
      </form>
      {/* True ✅ [Req 3.3]: เช็ก ruleName.trim().length === 0 แสดงผล Live Preview ตรงตามสเปก 100% */}
      {ruleName.trim().length === 0 ? (
        <p>Live Draft: [UNTITLED] via {protocol}</p>
      ) : (
        <p>
          Live Draft: {ruleName} via {protocol}
        </p>
      )}
    </section>
  );
}
