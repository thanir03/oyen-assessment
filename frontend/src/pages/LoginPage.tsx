import React from "react";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/auth";
import { validatePassword, validateUsername } from "../utils/helper";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const LoginPage = (): React.ReactNode => {
  const { handleLogin } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = (username: string, password: string) => {
    if (!validateUsername(username) || !validatePassword(password))
      showToast("error", "Invalid form fields");

    login(username, password).then(({ status, message }) => {
      if (status) {
        showToast("success", "Successfully logged in");
        handleLogin();
      } else {
        console.log(message);
        showToast("error", message);
      }
    });
  };

  return (
    <div className="text-white h-full m-5 flex flex-col gap-3 mt-10">
      <h1 className=" text-center text-3xl ml-5">Login</h1>
      <p className="text-center ml-5">Hi welcome back!</p>
      <AuthForm buttonTitle="Login" onSubmit={handleSubmit} />
      <p className="text-center">
        Not registered yet?{" "}
        <Link className="text-blue-600" to={"/register"}>
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
