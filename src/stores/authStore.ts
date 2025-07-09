import { create } from "zustand";
import { getAccessTokenSilently } from "@auth0/auth0-react"; // will use from CallbackPage

interface AuthState {
  userLogin: string | null;
  token: string | null;
  userrole: string | null;
  setToken: (token: string) => void;
  setUserInfo: (userLogin: string, userrole: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userLogin: null,
  token: null,
  userrole: null,

  setToken: (token) => set({ token }),

  setUserInfo: (userLogin, userrole) => {
    set({ userLogin, userrole });
  },

  logout: () => {
    set({ userLogin: null, token: null, userrole: null });
  },
}));