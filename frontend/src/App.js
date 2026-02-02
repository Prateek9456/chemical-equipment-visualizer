import React, { useState, useEffect } from "react";
import axios from "axios";
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
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const downloadReport = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/report/",
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "equipment_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF report.");
    }
  };

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

        {data && data.type_distribution && (
          <>
            <SummaryCards data={data} />
            <EquipmentChart data={data} />
            <DataTable data={data} />

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <button className="primary-btn" onClick={downloadReport}>
                Download PDF Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
