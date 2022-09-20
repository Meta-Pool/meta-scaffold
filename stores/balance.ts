import create from "zustand";

// Learn more about state-management with zustand
// https://zustand-demo.pmnd.rs/
interface BalanceState {
  balance: number;
  setBalance: (value: number) => void;
}

export const useStore = create<BalanceState>((set) => ({
  balance: 0,
  setBalance: (value: number) => set((state) => ({ ...state , balance: value })),
}));
