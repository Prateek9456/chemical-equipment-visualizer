import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SummaryCards from "./components/SummaryCards";
import EquipmentChart from "./components/EquipmentChart";
import DataTable from "./components/DataTable";

function App() {
  const [data, setData] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Chemical Equipment Parameter Visualizer</h1>

      <FileUpload onUploadSuccess={(responseData) => {
        console.log("UPLOAD SUCCESS:", responseData);
        setData(responseData);
      }} />

      {data && (
        <>
          <SummaryCards data={data} />
          <EquipmentChart distribution={data.type_distribution} />
          <DataTable distribution={data.type_distribution} />
        </>
      )}
    </div>
  );
}

export default App;
