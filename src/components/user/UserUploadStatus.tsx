import React, { useEffect, useState } from "react";
import { useFileStatusStore } from "../../stores/FileStatusStore";
import { DOWNLOAD_URL, TYPE_OPTIONS_LIST, YEAR_OPTIONS_LIST, CATEGORY_OPTIONS_LIST, STATUS_OPTIONS_LIST } from "../../constants";
import { useAuthStore } from "../../stores/authStore";
import { convertTimeFormat } from "../../utility/Utility";
import '../../../css/FileUploadStatus.css';

const UserUploadStatus: React.FC = () => {
  const { files, fetchFiles } = useFileStatusStore();
  const { userLogin } = useAuthStore();

  const [sortField, setSortField] = useState<string>("uploaddate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    userid: userLogin || "",
    year: "",
    category: "",
    filetype: "",
    status: "",
  });

  useEffect(() => {
    fetchFiles({ userid: userLogin }, sortField, sortOrder);
  }, []);

  useEffect(() => {
    fetchFiles(filters, sortField, sortOrder);
  }, [userLogin, filters, sortField, sortOrder]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDownload = (fileId: string) => {
    window.open(`${DOWNLOAD_URL}?fileId=${fileId}`, '_blank');
  };

  return (
    <div className="grid-container usa-prose">
      <h2>Upload Status Dashboard</h2>

      <div className="form-row-inline">
        <div className="form-group">
          <label htmlFor="year-select" className="form-label">Year:</label>
          <select id="year-select" name="year" onChange={handleFilterChange} className="form-select">
            {YEAR_OPTIONS_LIST.map((yearOption) => (
              <option key={yearOption.value} value={yearOption.value}>{yearOption.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category-select" className="form-label">Category:</label>
          <select id="category-select" name="category" onChange={handleFilterChange} className="form-select">
            {CATEGORY_OPTIONS_LIST.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type-select" className="form-label">Type:</label>
          <select id="type-select" name="filetype" onChange={handleFilterChange} className="form-select">
            {TYPE_OPTIONS_LIST.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status-select" className="form-label">Status:</label>
          <select id="status-select" name="status" onChange={handleFilterChange} className="form-select" defaultValue="ALL">
            {STATUS_OPTIONS_LIST.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="record-count">
        Total Records: {files.length}
      </div>

      <table className="usa-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Filename</th>
            <th>Year</th>
            <th>Category</th>
            <th>Status</th>
            <th>User Info</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file.id}>
              <td>{index + 1}</td>
              <td>{file.filename}</td>
              <td>{file.year}</td>
              <td>{file.category}</td>
              <td>{file.status}</td>
              <td>{file.userinfo}</td>
              <td>{convertTimeFormat(file.uploaddate)} (LT)</td>
              <td>
                <button onClick={() => handleDownload(file.id)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserUploadStatus;
