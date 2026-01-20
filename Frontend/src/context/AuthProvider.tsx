import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./auth.context";
import type { User } from "./auth.context";


// lazy initializer
function getInitialUser(): User | null {
  const storedUser = localStorage.getItem("user");
  return storedUser ? (JSON.parse(storedUser) as User) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getInitialUser());

  const login = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
