import React, { useContext } from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const AuthContext = React.createContext<IAuthContext>({
  isLoggedIn: true,
  handleLogout: () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
