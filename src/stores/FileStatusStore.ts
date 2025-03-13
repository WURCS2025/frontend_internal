import { create } from "zustand";
import { FileStatus } from "../models/FileStatus";
import { FILE_STATUS_URL } from "../constants";

interface FileStatusState {
  files: FileStatus[];
  fetchFiles: () => Promise<void>;
  sortBy: (key: keyof FileStatus) => void;
}

export const useFileStatusStore = create<FileStatusState>((set) => ({
  files: [],

  fetchFiles: async () => {
    try {
      const response = await fetch(`${FILE_STATUS_URL}/${localStorage.getItem("user")}`);
      const data: FileStatus[] = await response.json();
      set({ files: data });
    } catch (error) {
      console.error("Error fetching file status:", error);
    }
  },

  sortBy: (key) => {
    set((state) => ({
      files: [...state.files].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      }),
    }));
  },
}));
