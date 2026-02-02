import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SummaryCards from "./components/SummaryCards";
import EquipmentChart from "./components/EquipmentChart";
import DataTable from "./components/DataTable";
import axios from "axios";
import "./App.css";

const API_BASE = "https://YOUR-BACKEND.onrender.com";

function App() {
  const [data, setData] = useState(null);

  const downloadReport = async () => {
    const res = await axios.get(
      `${API_BASE}/api/report/`,
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.pdf";
    a.click();
  };

  return (
    <div className="app-root">
      <h1>Chemical Equipment Visualizer</h1>

      <FileUpload onUploadSuccess={setData} />

      {data && (
        <>
          <SummaryCards data={data} />
          <EquipmentChart data={data} />
          <DataTable data={data} />
          <button onClick={downloadReport}>
            Download PDF Report
          </button>
        </>
      )}
    </div>
  );
}

export default App;
