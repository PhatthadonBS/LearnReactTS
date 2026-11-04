import { createContext, useContext, useState } from "react";

// True ✅ [Req 1.1 & 1.2]: ประกาศ EnvironmentTier Union Type และ interface ClusterSecurityContextValue ครบถ้วนถูกต้อง!
type EnvironmentTier = "PRODUCTION" | "STAGING" | "DEVELOPMENT";

interface ClusterSecurityContextValue {
  environment: EnvironmentTier,
  maskSensitiveData: boolean,
  onChangeEnvironment: (tier: EnvironmentTier) => void,
  onToggleMasking: () => void,
}

// True ✅ [Req 1.3 & 1.4]: สร้าง ClusterSecurityContext ด้วย createContext<ClusterSecurityContextValue | null>(null) และเขียน Custom Guard Hook `useClusterSecurity` ได้ไร้ที่ติ!
const ClusterSecurityContext =
  createContext<ClusterSecurityContextValue | null>(null);

function useClusterSecurity() {
  const context = useContext(ClusterSecurityContext);
  if (!context)
    throw new Error(
      "useClusterSecurity must be used within ClusterSecurityContext",
    );
  return context;
}

// True ✅ [Req 2.1]: Leaf Component ตัวที่ 1 ดึงข้อมูลผ่าน useClusterSecurity() โดยตรงโดยไม่รับ Props ใดๆ และแสดงผลตรงสเปก 100%!
function ConnectionUriPreview() {
  const { environment, maskSensitiveData } = useClusterSecurity();

  return (
    <article>
      <h4>[Leaf 1: PostgreSQL Connection URI Preview]</h4>
      <p>Active Tier: {environment}</p>
      <p>
        {maskSensitiveData
          ? "URI: postgres://admin:********@pg-cluster.internal:5432/app_db"
          : "URI: postgres://admin:SuperSecretPg18@pg-cluster.internal:5432/app_db"}
      </p>
    </article>
  );
}

// True ✅ [Req 2.2]: Leaf Component ตัวที่ 2 ดึงทั้งค่าและฟังก์ชันผ่าน useClusterSecurity() โดยไม่รับ Props และผูกปุ่มทั้ง 4 ปุ่มถูกต้อง 100%!
function SecurityPolicyControls (){
    const {maskSensitiveData, onToggleMasking, onChangeEnvironment} = useClusterSecurity();
    return <article>
        <h4>[Leaf 2: Security Policy Controls]</h4>
        <div>
            <button type="button" onClick={() => onChangeEnvironment("PRODUCTION")}>Set Tier: PRODUCTION</button>
            <button type="button" onClick={() => onChangeEnvironment("STAGING")}>Set Tier: STAGING</button>
            <button type="button" onClick={() => onChangeEnvironment("DEVELOPMENT")}>Set Tier: DEVELOPMENT</button>
            <button type="button" onClick={onToggleMasking}>{maskSensitiveData ? "Reveal Credentials" : "Mask Credentials"}</button>
        </div>
    </article>
}

// True ✅ [Req 3]: Component ชั้นกลาง WorkspaceMiddleFrame ไม่รับ Props ใดๆ และไม่ต้องยุ่งกับ Context เลย (พิสูจน์ Zero Prop Drilling 100%!)
function WorkspaceMiddleFrame(){
    return <div>
        <h3>[Middle Layer: Workspace Frame (Zero Props Passed)]</h3>
        <ConnectionUriPreview/>
        <SecurityPolicyControls/>
    </div>
}

// True ✅ [Req 4]: Root Component ถือครอง State และตั้งเสากระจายสัญญาณด้วย `<ClusterSecurityContext value={contextValue}>` ตามมาตรฐาน React 19+ ได้สมบูรณ์แบบ!
export default function ClusterSecurityContextLab(){
    const [environment, setEnvironment] = useState<EnvironmentTier>("PRODUCTION")
    const [maskSensitiveData, setMaskSensitiveData] = useState<boolean>(true)

    function handleEnvChange(env: EnvironmentTier){
        setEnvironment(env)
    }

    function handleToggleMasking(){
        setMaskSensitiveData(prev => !prev)
    }

    const contextValue: ClusterSecurityContextValue = {
        environment: environment,
        maskSensitiveData: maskSensitiveData,
        onChangeEnvironment: handleEnvChange,
        onToggleMasking: handleToggleMasking
    }

    return <ClusterSecurityContext value={contextValue}>
        <section>
            <h2>[PostgreSQL Security Context Coordinator]</h2>
            <p>Root Summary — Environment: {environment} | Credential Masking: {maskSensitiveData ? "ON" : "OFF"}</p>
        <WorkspaceMiddleFrame/>
        </section>
    </ClusterSecurityContext>
}