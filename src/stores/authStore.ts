import { create } from "zustand";
import { LOGIN_URL, SESSION_LENGTH } from "../constants";

interface AuthState {
  userLogin: string | null;
  token: string | null;
  expiration: number | null; // Expiration timestamp
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userLogin: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  expiration: localStorage.getItem("expiration")
    ? parseInt(localStorage.getItem("expiration") || "0", 10)
    : null,

  login: async (username, password) => {
    try {
      const response = await fetch(`${LOGIN_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) return false;

      // const data = await response.json();
      const expiration = Date.now() + SESSION_LENGTH * 60 * 1000; // 30 minutes expiration
      const data = {
        token: password
      }

      set({ userLogin: username, token: data.token, expiration });

      localStorage.setItem("user", username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiration", expiration.toString());

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  logout: () => {
    set({ userLogin: null, token: null, expiration: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  },

  checkSession: () => {
    const expiration = localStorage.getItem("expiration");
    if (expiration && Date.now() > parseInt(expiration, 10)) {
      set({ userLogin: null, token: null, expiration: null });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
    }
  },
}));
