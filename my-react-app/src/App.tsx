import "./App.css";
import SystemBootCard from "./modules/module-1-fundamentals/exercises/ex-1.1.1-vite-setup/SystemBootCard";
import RenderPipelineInspector from "./modules/module-1-fundamentals/exercises/ex-1.1.2-render-tree/RenderPipelineInspector";
import TsxCompilerProbe from "./modules/module-1-fundamentals/exercises/ex-1.1.3-tsx-expressions/TsxCompilerProbe";
import ClusterNodePropsLab from "./modules/module-1-fundamentals/exercises/ex-1.1.4-typed-props/ClusterNodePropsLab";
import FirewallRuleGate from "./modules/module-1-fundamentals/exercises/ex-1.1.5-conditional-ui/FirewallRuleGate";
import DatabaseQueryLogList from "./modules/module-1-fundamentals/exercises/ex-1.1.6-list-rendering/DatabaseQueryLogList";
import PureMetricsDashboard from "./modules/module-1-fundamentals/exercises/ex-1.1.7-pure-components/PureMetricsDashboard";

function App() {
  return (
    // True ✅ [Workshop 1.1.2 - 1.1.7]: โครงสร้าง <main> และลำดับการวาง Component ครบถ้วนถูกต้อง!
    <main className="w-full h-full bg-slate-100 p-20">
      <h1>React Mentorship Lab</h1>
      <SystemBootCard />
      <RenderPipelineInspector />
      <TsxCompilerProbe />
      <ClusterNodePropsLab />
      <FirewallRuleGate />
      <DatabaseQueryLogList />
      <PureMetricsDashboard />
    </main>
  );
}

export default App;
