import axiosInstance from "@/utils/axiosInstance";
import { create } from "zustand";

interface useStoreTypes {
  setUser: (user: any) => void;
  CheckAuth: () => void;
  student: any;
  lecturer: any;
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
  error: any;
}

const useStore = create<useStoreTypes>((set) => ({
  student: null,
  lecturer: null,
  error: null,
  isCheckingAuth: true,
  isAuthenticated: false,
  CheckAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axiosInstance.get(`auth/check-auth`);
      if (response.data.user.role === "lecturer") {
        set({
          lecturer: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } else {
        set({
          student: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      }
    } catch (error) {
      set({
        error: error,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },
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
