import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function EquipmentChart({ distribution }) {
  const data = {
    labels: Object.keys(distribution),
    datasets: [
      {
        data: Object.values(distribution),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8BC34A",
          "#9C27B0",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "400px", marginBottom: "30px" }}>
      <h3>Equipment Type Distribution</h3>
      <Pie data={data} />
    </div>
  );
}

export default EquipmentChart;
