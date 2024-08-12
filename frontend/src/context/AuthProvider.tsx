import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { checkWhetherUserIsLoggedIn, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = (props: IAuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkWhetherUserIsLoggedIn().then(({ status }) => {
      setIsLoggedIn(status);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleLogout = useCallback(() => {
    logout().then(({ status }) => {
      setIsLoggedIn(!status);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
