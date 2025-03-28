import React, { useEffect, useState } from "react";
import { useFileStatusStore } from "../../stores/FileStatusStore";
import { DOWNLOAD_URL, TYPE_OPTIONS_LIST, YEAR_OPTIONS_LIST, CATEGORY_OPTIONS_LIST, STATUS_OPTIONS_LIST } from "../../constants";
import { useAuthStore } from "../../stores/authStore";
import { convertTimeFormat } from "../../utility/Utility";
import { USER_LIST_URL, DELETE_FILE_URL } from "../../constants";
import { useConfirmation } from "../common/BooleanConfirmationHook";
import { FileStatus } from "../../models/FileStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash, faPaperPlane, faCommentDots } from "@fortawesome/free-solid-svg-icons";

import '../../../css/FileUploadStatus.css';

const AdminUploadStatus: React.FC = () => {
  const { files, fetchFiles } = useFileStatusStore();
  const { userLogin } = useAuthStore();
  const { confirm, Confirmation } = useConfirmation();
  const [userList, setUserList] = useState<{ id: string, username: string }[]>([]);
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
    fetchFiles({ userid: 'admin' }, sortField, sortOrder);
  }, []);

  useEffect(() => {
    fetchFiles(filters, sortField, sortOrder);
  }, [userLogin, filters, sortField, sortOrder]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${USER_LIST_URL}/userlist?username=${localStorage.getItem("user")}`); // Replace with your actual API route
        console.log("fetchUsers response:", response);
        const data = await response.json();
        setUserList(data); // Assuming the data is an array of { id, name }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDownload = (fileId: string) => {
    window.open(`${DOWNLOAD_URL}?fileId=${fileId}`, '_blank');
  };

const handleDelete = async (file: FileStatus) => {
    
    const confirmed = await confirm({
      title: "Confirm File Deletion",
      description: `Are you sure you want to delete file "${file.filename}"?`,
      confirmLabel: "Yes, delete",
      cancelLabel: "Cancel"
    });

    if (!confirmed) return;
  
    try {
      const response = await fetch(`${DELETE_FILE_URL}/${file.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorConfirm = await confirm({
        title: "File Deletion Failed",
        description: `Failed to delete file ${file.filename}`,
        confirmLabel: "Ok"
      });
        return;
      }
  
      const fileDeletedConfirmed = await confirm({
        title: "File Deleted Successfully",
        description: `File "${file.filename}" has been deleted successfully.`,
        confirmLabel: "Ok",
        cancelLabel: ""
      });
      fetchFiles(filters, sortField, sortOrder); // Refresh list
    } catch (error) {
      const errorConfirm = await confirm({
        title: "File Deletion Failed",
        description: `Failed to delete file ${file.filename}, Error: ${error}`,
        confirmLabel: "Ok"
      });
      console.error("Delete error:", error);
    }
  };
  
  const handlePushData = (fileId: string) => {
    console.log("Push data for", fileId);
    // Implement push logic
  };
  
  const handleComment = (fileId: string) => {
    console.log("Comment on", fileId);
    // Implement comment logic
  };

  return (
    <div className="grid-container usa-prose">
      <h2>Admin Upload Status Dashboard</h2>

      {Confirmation}
      <div className="form-row-inline">
        <div className="form-group">
          <label htmlFor="user-select" className="form-label">User:</label>
          <select
            id="user-select"
            name="userid"
            onChange={handleFilterChange}
            className="form-select"
            value={filters.userid}
          >
            <option value="">All</option>
            {userList.map((user) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
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
              <td>{convertTimeFormat(file.uploaddate)}  (LT)</td>
              <td className="action-icon-group usa-prose">
  <button className="usa-button usa-button--unstyled margin-right-1" onClick={() => handleDownload(file.id)} title="Download File">
    <FontAwesomeIcon icon={faDownload} />
  </button>
  <button className="usa-button usa-button--unstyled margin-right-1" onClick={() => handleDelete(file)} title="Delete File">
    <FontAwesomeIcon icon={faTrash} />
  </button>
  <button className="usa-button usa-button--unstyled margin-right-1" onClick={() => handlePushData(file.id)} title="Push Data">
    <FontAwesomeIcon icon={faPaperPlane} />
  </button>
  <button className="usa-button usa-button--unstyled" onClick={() => handleComment(file.id)} title="Add Comment">
    <FontAwesomeIcon icon={faCommentDots} />
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUploadStatus;
