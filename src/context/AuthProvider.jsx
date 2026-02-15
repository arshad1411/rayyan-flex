import { useState } from "react";
import { AuthContext } from "./auth-context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });

  const login = (data) => {
    localStorage.setItem("jwt", data.jwt);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("role", data.role);

    setUser(data.user);
    setRole(data.role);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
