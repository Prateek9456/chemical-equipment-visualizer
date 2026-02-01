import React from "react";

function DataTable({ distribution }) {
  return (
    <div>
      <h3>Equipment Count Table</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Equipment Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(distribution).map(([type, count]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
