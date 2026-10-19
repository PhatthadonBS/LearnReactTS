// ============================================================================
// 🔍 STRICT LIVE INLINE REVIEW (Workshop 1.1.5 — FirewallRuleGate.tsx)
// - Req 1 (Type Alias & Props Interface Contract): True ✅ (ประกาศ RuleAction และ FirewallRuleCardProps ถูกต้อง 100%)
// - Req 2 (Early Return Guard Clause & Default Port): True ✅ (แก้ไขค่าเริ่มต้น port = 443 และทำ Guard Clause 'if (!isActive) return null;' ถูกต้อง 100%)
// - Req 3 (Conditional Rendering & Zero-Trap Protection): True ✅ (ใช้ Ternary สลับ Policy และใช้ 'blockedPackets > 0 &&' ป้องกันเลข 0 โผล่ได้อย่างยอดเยี่ยม!)
// - Req 4 (Main Component with 3 Test Scenarios): True ✅ (ส่ง Props ทั้ง 3 ใบครบถ้วนถูกต้อง)
// - Req 5 (Integration in App.tsx & Zero Lint/Type Errors): True ✅ (ผ่าน npm run lint และ npx tsc -b 100%)
// ============================================================================

// True ✅ [Req 1 - Part 1]: ประกาศ Union Literal Type ถูกต้อง 100%
type RuleAction = "ALLOW" | "DROP";

// True ✅ [Req 1 - Part 2]: ประกาศ Interface พร้อม Optional Prop 'port?: number' ครบถ้วน
interface FirewallRuleCardProps {
  ruleName: string;
  isActive: boolean;
  action: RuleAction;
  blockedPackets: number;
  port?: number;
}

function FirewallRuleCard({
  ruleName,
  isActive,
  action,
  blockedPackets,
  // True ✅ [Req 2 - Default Value]: กำหนดค่าเริ่มต้น port = 443 ตรงสเปก 100%
  port = 443,
}: FirewallRuleCardProps) {
  // True ✅ [Req 2 - Guard Clause]: ดัก Early Return คืนค่า null เมื่อกฎไม่ได้เปิดใช้งาน ถูกต้องและคลีนมาก!
  if (!isActive) return null;

  return (
    <article>
      {/* True ✅ [Req 3 - Part 1]: แสดงชื่อกฎและพอร์ตใน <h3> ตรงสเปก */}
      <h3>
        Rule: {ruleName} (Port: {port})
      </h3>
      {/* True ✅ [Req 3 - Part 2]: ใช้ Ternary Operator สลับข้อความ Policy ตามค่า action ถูกต้อง */}
      {action === "ALLOW" ? (
        <p>Policy: PERMITTED_TRAFFIC</p>
      ) : (
        <p>Policy: BLOCKED_TRAFFIC</p>
      )}

      {/* True ✅ [Req 3 - Part 3]: ป้องกันกับดักเลข 0 (Zero-Trap) ด้วยนิพจน์เปรียบเทียบ 'blockedPackets > 0 &&' ได้อย่างแม่นยำ! */}
      {blockedPackets > 0 && (
        <aside>Alert: {blockedPackets} malicious packets dropped!</aside>
      )}
    </article>
  );
}

// True ✅ [Req 4]: สร้าง FirewallRuleGate และส่งข้อมูลทดสอบทั้ง 3 ใบครบทุกเงื่อนไข
export default function FirewallRuleGate() {
  return (
    <section>
      <h2>[Firewall Gate]: Active Security Rules</h2>
      <FirewallRuleCard
        ruleName="SSH Brute-Force Shield"
        isActive
        action="DROP"
        blockedPackets={142}
        port={22}
      />
      <FirewallRuleCard
        ruleName="HTTPS Public Ingress"
        isActive
        action="ALLOW"
        blockedPackets={0}
      />
      <FirewallRuleCard
        ruleName="Legacy Telnet Rule"
        isActive={false}
        action="DROP"
        blockedPackets={999}
        port={23}
      />
    </section>
  );
}