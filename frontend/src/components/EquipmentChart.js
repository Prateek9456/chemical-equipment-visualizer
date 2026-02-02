import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../App.css";

/* ✅ REQUIRED REGISTRATION (Chart.js v3+) */
ChartJS.register(ArcElement, Tooltip, Legend);

function EquipmentChart({ data }) {
  const chartData = {
    labels: Object.keys(data.type_distribution),
    datasets: [
      {
        data: Object.values(data.type_distribution),
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#dc2626",
          "#f59e0b",
          "#7c3aed",
          "#0891b2",
        ],
      },
    ],
  };

  return (
    <section className="card chart-card">
      <h2 className="section-title">Equipment Type Distribution</h2>

      <div className="chart-wrapper">
        <Pie data={chartData} />
      </div>
    </section>
  );
}

export default EquipmentChart;
