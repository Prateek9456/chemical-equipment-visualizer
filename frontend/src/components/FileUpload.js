import React, { useState } from "react";
import axios from "axios";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Select a CSV file first");
      return;
    }

    if (!onUploadSuccess) {
      alert("Upload handler missing (frontend wiring issue)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData
      );

      console.log("RAW RESPONSE:", response);

      onUploadSuccess(response.data);

    } catch (err) {
  console.error("AXIOS ERROR OBJECT:", err);

  if (err.response) {
    console.error("RESPONSE DATA:", err.response.data);
    console.error("RESPONSE STATUS:", err.response.status);
    console.error("RESPONSE HEADERS:", err.response.headers);
  } else if (err.request) {
    console.error("NO RESPONSE RECEIVED:", err.request);
  } else {
    console.error("ERROR MESSAGE:", err.message);
  }

  alert("Upload failed (frontend)");
} finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <br /><br />
      <button onClick={uploadFile} disabled={loading}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
    </div>
  );
}

export default FileUpload;
