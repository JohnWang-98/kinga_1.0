import { create } from "zustand";

interface CallerIdState {
  selectedOptions: number[];
  setSelectedOptions: (options: number[]) => void;
}

export const useCallerIdStore = create<CallerIdState>((set) => ({
  selectedOptions: [],
  setSelectedOptions: (options) => set({ selectedOptions: options }),
}));
