import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import SummaryCards from "./components/SummaryCards";
import EquipmentChart from "./components/EquipmentChart";
import DataTable from "./components/DataTable";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200); // intro duration

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return (
      <div className="intro-screen">
        <div className="molecule-animation">
          <span />
          <span />
          <span />
          <span />
        </div>
        <h1>Chemical Equipment Analytics</h1>
        <p>Visualizing industrial data intelligently</p>
      </div>
    );
  }

  return (
    <div className="app-root animated-bg">
      <div className="app-container fade-in">
        <h1 className="app-title">
          Chemical Equipment Parameter Visualizer
        </h1>

        <FileUpload onUploadSuccess={setData} />

        {data && (
          <>
            <SummaryCards data={data} />
            <EquipmentChart data={data} />
            <DataTable data={data} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
