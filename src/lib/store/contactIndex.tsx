import { create } from "zustand";

interface SelectedOptionsStore {
  selectedOptions: number[];
  toggleSelection: (id: number) => void;
}

const useSelectedOptionsStore = create<SelectedOptionsStore>((set) => ({
  selectedOptions: [],
  toggleSelection: (id) =>
    set((state) => ({
      selectedOptions: state.selectedOptions.includes(id)
        ? state.selectedOptions.filter((option) => option !== id)
        : [...state.selectedOptions, id],
    })),
}));

export default useSelectedOptionsStore;
