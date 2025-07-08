
"use client";

import { create } from 'zustand';

export interface UploadedFile {
  file: File;
  name: string;
  description: string;
  tags: string[];
}

interface UploadState {
  files: UploadedFile[];
  addFiles: (filesToAdd: File[]) => void;
  removeFile: (indexToRemove: number) => void;
  updateFile: (indexToUpdate: number, data: Partial<Omit<UploadedFile, 'file'>>) => void;
  clearFiles: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  files: [],
  addFiles: (filesToAdd) => set((state) => {
    const newFiles = filesToAdd.map(file => ({
        file,
        name: "", // Default name is empty to force user input
        description: "",
        tags: []
    }));
    return { files: [...state.files, ...newFiles] };
  }),
  removeFile: (indexToRemove) => set((state) => ({
    files: state.files.filter((_, index) => index !== indexToRemove)
  })),
  updateFile: (indexToUpdate, data) => set((state) => ({
    files: state.files.map((item, index) => 
      index === indexToUpdate ? { ...item, ...data } : item
    ),
  })),
  clearFiles: () => set({ files: [] }),
}));
