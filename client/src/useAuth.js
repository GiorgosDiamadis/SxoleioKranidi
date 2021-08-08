import { createContext, useCallback, useMemo, useState } from "react";
const isAuthed = require("./Utils/isAuthenticated")

let initState = isAuthed();

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initState.user);
  const login = useCallback((user, token) => {
    localStorage.setItem("auth", token);
    setUser(user);
  });

  const logout = useCallback(() => {
    localStorage.removeItem("auth");
    setUser(null);
  });

  const providerValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
