import React from "react";
import "../App.css";

function SummaryCards({ data }) {
  return (
    <section className="summary-grid">
      <div className="card summary-card">
        <p className="summary-label">Total Equipment</p>
        <h2 className="summary-value">{data.total_equipment}</h2>
      </div>

      <div className="card summary-card">
        <p className="summary-label">Avg Flow Rate</p>
        <h2 className="summary-value">
          {data.average_flowrate.toFixed(2)}
        </h2>
      </div>

      <div className="card summary-card">
        <p className="summary-label">Avg Pressure</p>
        <h2 className="summary-value">
          {data.average_pressure.toFixed(2)}
        </h2>
      </div>

      <div className="card summary-card">
        <p className="summary-label">Avg Temperature</p>
        <h2 className="summary-value">
          {data.average_temperature.toFixed(2)}
        </h2>
      </div>
    </section>
  );
}

export default SummaryCards;
