import { create } from "zustand";

interface ToggleSwitchStore {
  isSwitchOn: boolean;
  toggleSwitch: () => void;
}

const useToggleSwitchStore = create<ToggleSwitchStore>((set) => ({
  isSwitchOn: false,
  toggleSwitch: () => set((state) => ({ isSwitchOn: !state.isSwitchOn })),
}));

export default useToggleSwitchStore;
