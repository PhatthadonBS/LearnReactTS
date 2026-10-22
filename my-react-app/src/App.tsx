import "./App.css";
// True ✅ [Workshop 1.2.4 & 1.2.5 - Req 4]: คอมเมนต์ปิด import ที่ไม่ได้ใช้คู่กับแท็ก JSX ด้านล่าง และนำ QueryJobQueueManager มาแสดงผลโดยรันผ่าน lint + tsc 0 Error!
// import SystemBootCard from "./modules/module-1-fundamentals/exercises/ex-1.1.1-vite-setup/SystemBootCard";
// import RenderPipelineInspector from "./modules/module-1-fundamentals/exercises/ex-1.1.2-render-tree/RenderPipelineInspector";
// import TsxCompilerProbe from "./modules/module-1-fundamentals/exercises/ex-1.1.3-tsx-expressions/TsxCompilerProbe";
// import ClusterNodePropsLab from "./modules/module-1-fundamentals/exercises/ex-1.1.4-typed-props/ClusterNodePropsLab";
// import FirewallRuleGate from "./modules/module-1-fundamentals/exercises/ex-1.1.5-conditional-ui/FirewallRuleGate";
// import DatabaseQueryLogList from "./modules/module-1-fundamentals/exercises/ex-1.1.6-list-rendering/DatabaseQueryLogList";
// import PureMetricsDashboard from "./modules/module-1-fundamentals/exercises/ex-1.1.7-pure-components/PureMetricsDashboard";
// import ClusterCommandPanel from "./modules/module-1-fundamentals/exercises/ex-1.2.1-event-handlers/ClusterCommandPanel";
// import FirewallRuleCreatorForm from "./modules/module-1-fundamentals/exercises/ex-1.2.2-usestate-form/FirewallRuleCreatorForm";
// import BatchQueueSimulator from "./modules/module-1-fundamentals/exercises/ex-1.2.3-state-snapshot/BatchQueueSimulator";
// import PostgresConfigEditor from "./modules/module-1-fundamentals/exercises/ex-1.2.4-immutable-objects/PostgresConfigEditor";
import QueryJobQueueManager from "./modules/module-1-fundamentals/exercises/ex-1.2.5-immutable-arrays/QueryJobQueueManager";

function App() {
  return (
    <main className="w-full h-full bg-slate-100 p-20">
      <h1>React Mentorship Lab</h1>
      {/* <SystemBootCard />
      <RenderPipelineInspector />
      <TsxCompilerProbe />
      <ClusterNodePropsLab />
      <FirewallRuleGate />
      <DatabaseQueryLogList />
      <PureMetricsDashboard />
      <ClusterCommandPanel />
      <FirewallRuleCreatorForm />
      <BatchQueueSimulator /> */}
      {/* True ✅ [Workshop 1.2.4 - Req 4.1]: นำ <PostgresConfigEditor /> มาแสดงผลใน <main> เรียบร้อย! */}
      {/* <PostgresConfigEditor/> */}
      <QueryJobQueueManager/>
    </main>
  );
}

export default App;
