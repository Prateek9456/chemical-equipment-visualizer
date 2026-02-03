import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../App.css";

/* ✅ Chart.js registration */
ChartJS.register(ArcElement, Tooltip, Legend);

function EquipmentChart({ data }) {
  /* 🛡️ Safety guard */
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#dc2626",
          "#f59e0b",
          "#7c3aed",
          "#0891b2",
          "#0ea5e9",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // 👈 IMPORTANT
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 14,
          padding: 14,
        },
      },
    },
  };

  return (
    <section className="card chart-card">
      <h2 className="section-title">Equipment Type Distribution</h2>

      {/* 🎯 SIZE CONTROL HAPPENS HERE */}
      <div
        className="chart-wrapper"
        style={{
          maxWidth: "360px",
          height: "360px",
          margin: "0 auto",
        }}
      >
        <Pie data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}

export default EquipmentChart;
