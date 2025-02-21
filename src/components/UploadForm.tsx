import React, { useState } from 'react';
import { useUploadStore } from '../store';
import { TYPE_OPTIONS, YEAR_OPTIONS, CATEGORY_OPTIONS } from '../constants';

const UploadForm: React.FC = () => {
  const { file, type, year, category, user, setFile, setType, setYear, setCategory, setUser } = useUploadStore();
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const portnumber = 55733; // Replace with your actual port number
  const uploadurl = `https://localhost:${portnumber}/api/S3File/upload`;
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setUploadStatus(''); // Reset status on new file selection
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name); // Extract filename
    formData.append('type', type);
    formData.append('year', year);
    formData.append('category', category);
    formData.append('userInfo', user);
    formData.append('s3key', 'testkey');
    formData
    try {
      const response = await fetch(uploadurl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('✅ File uploaded successfully!');
      } else {
        setUploadStatus('❌ Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('❌ Error uploading file.');
    }
  };

  return (
    <div className="grid-container usa-prose">
      <h2>Upload File</h2>
      {uploadStatus && (
        <div className={`usa-alert ${uploadStatus.includes('❌') ? 'usa-alert--error' : 'usa-alert--success'}`}>
          <p>{uploadStatus}</p>
        </div>
      )}
      <form className="usa-form" onSubmit={handleSubmit}>
        
        <label className="usa-label" htmlFor="file">Select File:</label>
        <input className="usa-input" type="file" id="file" onChange={handleFileChange} required />

        <label className="usa-label" htmlFor="type">File Type:</label>
        <select className="usa-select" id="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <label className="usa-label" htmlFor="year">Year:</label>
        <select className="usa-select" id="year" value={year} onChange={(e) => setYear(e.target.value)} required>
          <option value="">Select Year</option>
          {YEAR_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <label className="usa-label" htmlFor="category">Category:</label>
        <select className="usa-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <label className="usa-label" htmlFor="user">User Name:</label>
        <input className="usa-input" type="text" id="user" value={user} onChange={(e) => setUser(e.target.value)} required />

        <button className="usa-button" type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
