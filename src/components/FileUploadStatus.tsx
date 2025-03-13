import React, { useEffect } from "react";
import { useFileStatusStore } from "../stores/FileStatusStore";

const UploadStatus: React.FC = () => {
  const { files, fetchFiles, sortBy } = useFileStatusStore();

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="grid-container usa-prose">
      <h2>Upload Status</h2>

      <div className="sort-buttons">
        <button className="usa-button" onClick={() => sortBy("fileType")}>Sort by File Type</button>
        <button className="usa-button" onClick={() => sortBy("fileStatus")}>Sort by File Status</button>
        <button className="usa-button" onClick={() => sortBy("userId")}>Sort by User ID</button>
      </div>

      <table className="usa-table">
        <thead>
          <tr>
            <th>File ID</th>
            <th>File Status</th>
            <th>User ID</th>
            <th>Metadata</th>
            <th>Year</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.fileId}>
              <td>{file.fileId}</td>
              <td>{file.fileStatus}</td>
              <td>{file.userId}</td>
              <td>{file.fileMetaData}</td>
              <td>{file.fileYear}</td>
              <td>{file.fileType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadStatus;
