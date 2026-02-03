import React, { useState } from "react";
import axios from "axios";
import "../App.css";

/**
 * 🔴 IMPORTANT
 * Replace this with your ACTUAL Render backend URL
 */
const API_BASE = "https://chemical-equipment-visualizer-00mh.onrender.com";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file); // lowercase key (LOCKED)

    try {
      const response = await axios.post(
        `${API_BASE}/api/upload/`,
        formData,
        {
          timeout: 60000, // ⏱ handles Render cold start
        }
      );

      onUploadSuccess(response.data);
    } catch (err) {
      console.error(err);

      if (err.code === "ECONNABORTED") {
        setError("Server is waking up. Please try again in 10–20 seconds.");
      } else {
        setError("Upload failed. Please check your CSV format.");
      }
    } finally {
      setLoading(false); // 🔑 NEVER leave UI stuck
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
          disabled={!file || loading}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
    </section>
  );
}

export default FileUpload;
