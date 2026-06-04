import { create } from "zustand";

export const useActiveIndexStore = create((set) => {
  return {
    activeIndex: 0,
    setActiveIndex: (index) => set({ activeIndex: index }),
  };
});

export const useUserStore = create((set) => {
  return {
    user: null,
    setUser: (usr) => set({ user: usr }),
  };
});

export const useStatus = create((set) => {
  return {
    status: [],
    active: 0,
    setStatus: (allStatus) => set({ status: allStatus }),
    setActive: (act) => set({ active: act }),
  };
});
