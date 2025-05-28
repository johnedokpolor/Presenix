import { create } from "zustand";

const useStore = create((set) => ({
  student: null,
  lecturer: null,
  setUser: (user: any) => {
    if (user.role === "student") {
      set({
        student: user,
      });
    } else {
      set({
        lecturer: user,
      });
    }
  },
}));

export default useStore;
