// AdminLogin.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const AnalystLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userrole = 'analyst';
    const success = await login(username, password, userrole);
    if (success) {
      navigate("/analyst/status");
    } else {
      setError("Invalid analyst username or password");
    }
  };

  return (
    <div className="grid-container usa-prose">   
          
      
      <h2>Analyst Login</h2>
      
      {error && <p className="usa-alert usa-alert--error">{error}</p>}
      <form className="usa-form" onSubmit={handleLogin}>
        <label className="usa-label" htmlFor="Analyst Username">Analyst Username</label>
        <input
          className="usa-input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="usa-label" htmlFor="password">Analyst Password</label>
        <input
          className="usa-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="usa-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default AnalystLogin;