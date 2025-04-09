// App.jsx
import React, { useState } from "react";
import DashboardTab from "./components/DashboardTab";
import AddPlayerTab from "./components/AddPlayerTab";
import AddPerformanceTab from "./components/AddPerformanceTab";

function App() {
  const [tab, setTab] = useState("dashboard");
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Cricket Player Performance Tracker</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${tab === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === "add-player" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("add-player")}
        >
          Add Player
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === "add-performance" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("add-performance")}
        >
          Add Performance
        </button>
      </div>

      <div>
        {tab === "dashboard" && <DashboardTab refresh={refresh} />}
        {tab === "add-player" && <AddPlayerTab onSuccess={triggerRefresh} />}
        {tab === "add-performance" && <AddPerformanceTab refresh={refresh} onSuccess={triggerRefresh} />   }
      </div>
    </div>
  );
}

export default App;
