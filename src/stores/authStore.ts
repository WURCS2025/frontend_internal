import { create } from "zustand";

interface AuthState {
  user: string | null;
  token: string | null;
  expiration: number | null; // Expiration timestamp
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  expiration: localStorage.getItem("expiration")
    ? parseInt(localStorage.getItem("expiration") || "0", 10)
    : null,

  login: async (username, password) => {
    try {
      // const response = await fetch("https://localhost:55733/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password }),
      // });

      // if (!response.ok) return false;

      // const data = await response.json();
      const expiration = Date.now() + 30 * 60 * 1000; // 30 minutes expiration

      set({ user: username, token: data.token, expiration });

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
    set({ user: null, token: null, expiration: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  },

  checkSession: () => {
    const expiration = localStorage.getItem("expiration");
    if (expiration && Date.now() > parseInt(expiration, 10)) {
      set({ user: null, token: null, expiration: null });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
    }
  },
}));
