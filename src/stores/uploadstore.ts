import { create } from 'zustand';

interface UploadState {
  file: File | null;
  type: string;
  year: string;
  category: string;
  user: string;
  setFile: (file: File | null) => void;
  setType: (type: string) => void;
  setYear: (year: string) => void;
  setCategory: (category: string) => void;
  setUser: (user: string) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  type: '',
  year: '',
  category: '',
  user: '',
  setFile: (file) => set({ file }),
  setType: (type) => set({ type }),
  setYear: (year) => set({ year }),
  setCategory: (category) => set({ category }),
  setUser: (user) => set({ user }),
}));
