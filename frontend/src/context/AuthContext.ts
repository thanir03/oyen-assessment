import React, { useContext } from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  handleLogout: () => void;
  handleLogin: () => void;
}

const AuthContext = React.createContext<IAuthContext>({
  isLoggedIn: true,
  handleLogout: () => {},
  handleLogin: () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
