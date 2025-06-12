import axiosInstance from "@/utils/axiosInstance";
import { create } from "zustand";

interface useStoreTypes {
  CheckAuth: () => void;
  SetUser: (user: any) => Promise<void>;
  Logout: () => Promise<void>;
  Login: (submitData: any) => Promise<void>;
  student: any;
  lecturer: any;
  user: any;
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
  error: any;
  authError: any;
}

const useStore = create<useStoreTypes>((set) => ({
  student: null,
  lecturer: null,
  user: null,
  error: null,
  authError: null,
  isCheckingAuth: true,
  isAuthenticated: false,
  CheckAuth: async () => {
    set({ error: null, student: null, user: null, lecturer: null });
    try {
      const { data } = await axiosInstance.get(`auth/check-auth`);
      set({
        user: data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      return data;
    } catch (error) {
      set({
        error: error,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
      return error;
    }
  },
  SetUser: async (user) => {
    set({ error: null, student: null, lecturer: null });
    try {
      set({
        user: user,
      });
    } catch (error) {
      set({
        error: error,
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
        authError: error,
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
        user: null,
      });
    } catch (error) {
      set({
        error: error,
      });
    }
  },
}));

export default useStore;
