import { create } from "zustand";
import { LOGIN_URL, SESSION_LENGTH } from "../constants";


interface AuthState {
  userLogin: string | null;
  token: string | null;
  userrole: string | null;
  expiration: number | null; // Expiration timestamp
  login: (username: string, password: string, userrole: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userLogin: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  userrole: localStorage.getItem("userrole"),
  expiration: localStorage.getItem("expiration")
    ? parseInt(localStorage.getItem("expiration") || "0", 10)
    : null,

  login: async (username: string, password: string, userrole: string) => {
    try {
      const response = await fetch(`${LOGIN_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, userrole }),
      });

      if (!response.ok) return false;

      // const data = await response.json();
      const expiration = Date.now() + SESSION_LENGTH * 60 * 1000; // 30 minutes expiration
      const data = {
        token: password
      }

      set({ userLogin: username, token: data.token, expiration, userrole });

      localStorage.setItem("user", username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiration", expiration.toString());
      localStorage.setItem("userrole", userrole);

      return true;
    } catch (error) {
      console.error("Login error for `${userrole}`:", error);
      return false;
    }
  },

  logout: () => {
    set({ userLogin: null, token: null, expiration: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userrole");
  },

  checkSession: () => {
    const expiration = localStorage.getItem("expiration");
    if (expiration && Date.now() > parseInt(expiration, 10)) {
      set({ userLogin: null, token: null, expiration: null });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("userrole");
    }
  },
}));
