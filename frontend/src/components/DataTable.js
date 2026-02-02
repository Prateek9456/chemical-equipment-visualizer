import React from "react";
import "../App.css";

function DataTable({ data }) {
  const entries = Object.entries(data.type_distribution);

  return (
    <section className="card table-card">
      <h2 className="section-title">Equipment Type Summary</h2>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Equipment Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([type, count]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DataTable;
