import React, { useState, useEffect } from "react";
import axios from "axios";

import FileUpload from "./components/FileUpload";
import SummaryCards from "./components/SummaryCards";
import EquipmentChart from "./components/EquipmentChart";
import DataTable from "./components/DataTable";

import "./App.css";

/* ✅ USE YOUR DEPLOYED BACKEND */
const API_BASE = "https://chemical-equipment-visualizer-00mh.onrender.com";

function App() {
  const [data, setData] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  /* ================================
     Intro animation timing
  ================================ */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  /* ================================
     PDF Download (safe & isolated)
  ================================ */
  const downloadReport = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/report/`,
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "equipment_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("PDF generation is currently unavailable.");
    }
  };

  /* ================================
     Intro Screen
  ================================ */
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

  /* ================================
     Main App
  ================================ */
  return (
    <div className="animated-bg">
      <div className="app-root app-container">
        <h1 className="app-title">
          Chemical Equipment Parameter Visualizer
        </h1>

        <FileUpload onUploadSuccess={setData} />

        {data && (
          <>
            <SummaryCards data={data} />

            {/* 🔒 SAFETY GUARD – NO MORE CRASHES */}
            {data.type_distribution && (
              <>
                <EquipmentChart data={data.type_distribution} />
                <DataTable data={data.type_distribution} />
              </>
            )}

            <div style={{ textAlign: "center", marginTop: "28px" }}>
              <button className="primary-btn" onClick={downloadReport}>
                Download PDF Report
              </button>
            </div>
          </>
        )}

        {/* ✅ Creator Credit */}
        <div className="creator-credit">
          Created by <span>Prateek Vashishtha</span>
        </div>
      </div>
    </div>
  );
}

export default App;
