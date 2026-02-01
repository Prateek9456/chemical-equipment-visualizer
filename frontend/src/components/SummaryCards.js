import React from "react";

function SummaryCards({ data }) {
  const cardStyle = {
    padding: "15px",
    background: "#f4f4f4",
    borderRadius: "8px",
    width: "200px",
    textAlign: "center",
  };

  const containerStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3>Total Equipment</h3>
        <p>{data.total_equipment}</p>
      </div>
      <div style={cardStyle}>
        <h3>Avg Flowrate</h3>
        <p>{data.average_flowrate}</p>
      </div>
      <div style={cardStyle}>
        <h3>Avg Pressure</h3>
        <p>{data.average_pressure}</p>
      </div>
      <div style={cardStyle}>
        <h3>Avg Temperature</h3>
        <p>{data.average_temperature}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
