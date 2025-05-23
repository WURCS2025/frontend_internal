import { create } from "zustand";
import { FileStatus } from "../models/FileStatus";
import { FILE_STATUS_URL } from "../constants";

interface FileStatusState {
  files: FileStatus[];
  fetchFiles: (filters: any, sortField: string, sortOrder: string) => Promise<void>;
  setFiles: (updatedFiles: FileStatus[]) => void;
}

export const useFileStatusStore = create<FileStatusState>((set) => ({
  files: [],

  setFiles: (updatedFiles) => set({ files: updatedFiles }),

  fetchFiles: async (filters, sortField, sortOrder) => {
    try {
      var body = JSON.stringify({
        userid: filters.userid,
        category: filters.category,
        byuser: filters.byuser,
        year: filters.year,
        type: filters.type,
        status: filters.status,
        sortField: sortField || 'uploaddate',
        sortOrder: sortOrder || 'desc', // Default to 'desc' if not provided
      });
      console.log("Request body at fileStatusStore:", body);
      console.log("Request filters at fileStatusStore:", filters);
      const response = await fetch(`${FILE_STATUS_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
        // body: JSON.stringify({
        //   userid: filters.userid,
        //   category: filters.category,
        //   year: filters.year,
        //   filetype: filters.filetype,
        //   status: filters.status,
        //   sortField,
        //   sortOrder,
        // }),
      });

      if (!response.ok) {
        console.error("Failed to fetch data:", response.statusText);
        console.error("Response status:", response.status);
        console.error("Response headers:", response.headers);
        console.error("Request body:", body);
        throw new Error("Failed to fetch data");
      }

      console.log("fetch data success:", response.json);
      console.log("Success Response status:", response.status);
      console.log("Success Response headers:", response.headers);
      console.log("Success Request body:", body);
      const data: FileStatus[] = await response.json();
      console.log("Success Response data:", data);
      set({ files: Array.isArray(data) ? data : [] });
    } catch (error) {
      
      console.error("Catch Error fetching file status:", error);
      set({ files: [] });
    }
  },
}));
