import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const API_BASE_URL =
  "https://chemical-equipment-visualizer-00mh.onrender.com";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file); // MUST be "file"

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUploadSuccess(response.data);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please check your CSV format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card upload-card">
      <h2 className="section-title">Upload Equipment CSV</h2>

      <div className="upload-controls">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="primary-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
    </section>
  );
}

export default FileUpload;
