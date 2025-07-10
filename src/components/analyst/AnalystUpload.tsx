import React, { useState, useRef, useEffect } from "react";
import { useUploadStore } from "../../stores/uploadstore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { UPLOAD_URL } from "../../constants";
import { TYPE_OPTIONS, YEAR_OPTIONS, CATEGORY_OPTIONS } from "../../constants";
import ScanFile  from "../common/ScanFile"; // Import ScanFile component

const AnalystUpload: React.FC = () => {
  const { file, type, year, category, user, setFile, setType, setYear, setCategory, setUser } = useUploadStore();
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string>("No file selected"); // ✅ Store file name
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to trigger file input
  const [scanTriggered, setScanTriggered] = useState(false);
  const [scanPassed, setScanPassed] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResetKey, setScanResetKey] = useState(0);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  
  const uploadurl = `${UPLOAD_URL}`; // Use the constant for the upload URL

  const navigate = useNavigate();
  const { userLogin } = useAuthStore();

  // useEffect(() => {

  //   if (userLogin) {
  //     setUser(userLogin); // ✅ Set username from userLogin
  //   }
  //   checkSession(); // Check session on mount

  //   const interval = setInterval(() => {
  //     checkSession();
  //     if (!localStorage.getItem("user")) {
  //       navigate("/login");
  //     }
  //   }, 10000); // Check every 10 seconds

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [userLogin, navigate, checkSession]);

  // 📌 Handle File Selection (Browse)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name); // ✅ Update file name
      setUploadStatus("");
      setScanMessage(null)
    }
  };

  // 📌 Handle Drag & Drop Events
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      setFile(droppedFile);
      setFileName(droppedFile.name); // ✅ Update file name
      setUploadStatus("");
      setScanMessage(null); // Reset scan message on new file drop
      
    }
  };

  const resetForm = () => {
    setFile(null);
    setFileName("No file selected");
    setScanMessage(null)
  };

  const fileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("filetype", type);
    formData.append("year", year);
    formData.append("category", category);
    formData.append("userInfo", user);
    formData.append("s3key", "testkey");

    try {
      const response = await fetch(uploadurl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("✅ File uploaded successfully!");
        resetForm(); // Reset form after successful upload
      } else {
        console.error("Upload failed:", response.statusText);
        setUploadStatus(`❌ Failed to upload file. Please try again.${response.statusText}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("❌ Error uploading file.");
    }
  };

  // 📌 Handle File Upload
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setUploadStatus("❌ Please select a file to upload.");
      return;
    }
  
    if (!type) {
      setUploadStatus("❌ Please select a file type.");
      return;
    }
    if (!year) {
      setUploadStatus("❌ Please select a year.");
      return;
    }
    if (!category) {
      setUploadStatus("❌ Please select a category.");
      return;
    }

    setScanTriggered(true); //disable scan trigger
    setUploadStatus("Scan file for virus...");
    // fileUpload(file); // Call the file upload function directly
    // // setUploadStatus("✅ File Uploading...");
    // await new Promise(resolve => setTimeout(resolve, 2000));

  }

  const handleScanResult = async ({ clean, message }: { clean: boolean; message: string }) => {
    setScanMessage(message);
    setScanTriggered(false);
  
    if (!clean) {
      setScanMessage(`⚠️ Please select a different file.`);
      setUploadStatus(`❌ File failed virus scan. ${message}`);
      setScanPassed(false);
      return;
    }
  
    if (!file) {
      setUploadStatus("❌ Please select a file to upload.");
      return;
    }

    setUploadStatus("✅ File passed virus scan. Uploading...");
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a delay for the scan result
    

    setScanPassed(true);
    

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("filetype", type);
    formData.append("year", year);
    formData.append("category", category);
    formData.append("userInfo", user);
    formData.append("s3key", "testkey");

    try {
      const response = await fetch(uploadurl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("✅ File uploaded successfully!");
        resetForm(); // Reset form after successful upload
      } else {
        console.error("Upload failed:", response);
        console.error("Upload failed:", response.statusText);
        setUploadStatus(`❌ Failed to upload file. Please try again.${response.statusText}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("❌ Error uploading file.");
    }
  };

  return (
    <div className="grid-container usa-prose">
      <h2>Upload File</h2>
      {uploadStatus && (
        <div className={`usa-alert ${uploadStatus.includes("❌") ? "usa-alert--error" : "usa-alert--success"}`}>
          <p>{uploadStatus}</p>
        </div>
      )}

{file && (
  <>
    <ScanFile
      file={file}
      triggerScan={scanTriggered}
      onResult={handleScanResult}
      onScanning={setScanning}
    />
    {scanMessage && (
      <div style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
        {scanMessage}
      </div>
    )}
  </>
)}

      <form className="usa-form" onSubmit={handleSubmit}>
        {/* 📌 USWDS Styled Drag & Drop File Input with File Name Display */}
        <div
          className={`usa-file-input ${dragActive ? "usa-file-input--drag" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()} // Open file dialog on click
          style={{
            border: "2px dashed #0071bc",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            background: dragActive ? "#f0f8ff" : "#fff",
          }}
        >
          <label className="usa-file-input__label" htmlFor="file">
            <span className="usa-file-input__target">
              <span className="usa-file-input__instructions" aria-hidden="true">
                Drag & drop a file here or <span className="usa-file-input__choose">Browse</span>
              </span>
              <br />
              <strong>{fileName}</strong> {/* ✅ Display the selected file name */}
            </span>
          </label>
          <input
            className="usa-file-input__input"
            type="file"
            id="file"
            accept="*/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            hidden // Hide the input, we use the label to trigger it
          />
        </div>

        {/* 📌 File Type */}
        <label className="usa-label" htmlFor="type">File Type:</label>
        <select className="usa-select" id="type" value={type} onChange={(e) => setType(e.target.value)} >
          <option value="">Select Type</option>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {/* 📌 Year Selection */}
        <label className="usa-label" htmlFor="year">Year:</label>
        <select className="usa-select" id="year" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          {YEAR_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {/* 📌 Category Selection */}
        <label className="usa-label" htmlFor="category">Category:</label>
        <select className="usa-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {/* 📌 User Name */}
        {/* <label className="usa-label" htmlFor="user">User Name:</label> */}
        <input className="usa-input" type="hidden" id="user" value={user} onChange={(e) => setUser(e.target.value)} required />

        {/* 📌 Submit Button */}
        <button className="usa-button" type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AnalystUpload;
