import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file); // lowercase key — DO NOT CHANGE

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData
      );
      onUploadSuccess(response.data);
    } catch (err) {
      setError("Upload failed. Please check your CSV file.");
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
