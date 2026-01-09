import "./main.css";
import TopHeader from "@/features/header/customHeader";
import { Routes, Route } from "react-router-dom";
import Settings from "./pages/settings";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <div className="w-full h-full flex flex-col bg-background">
      <TopHeader />
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
