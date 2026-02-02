import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const API_BASE = "https://YOUR-BACKEND.onrender.com";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${API_BASE}/api/upload/`,
        formData
      );
      onUploadSuccess(res.data);
    } catch {
      setError("Upload failed. Invalid CSV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card upload-card">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}

export default FileUpload;
