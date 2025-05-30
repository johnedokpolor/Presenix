import axiosInstance from "@/utils/axiosInstance";
import { create } from "zustand";

interface useStoreTypes {
  CheckAuth: () => Promise<void>;
  Logout: () => Promise<void>;
  Login: (submitData: any) => Promise<void>;
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
    set({ isCheckingAuth: true, error: null, student: null, lecturer: null });
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
  Login: async (submitData: any) => {
    set({ error: null });
    try {
      const response = await axiosInstance.post("/auth/login", submitData);
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
  Logout: async () => {
    set({ error: null });
    try {
      await axiosInstance.post("/auth/logout");
      set({
        error: null,
        isAuthenticated: false,
      });
    } catch (error) {
      set({
        error: error,
      });
      throw error;
    }
  },
}));

export default useStore;
