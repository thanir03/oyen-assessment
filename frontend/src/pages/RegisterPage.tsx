import React from "react";
import { useAuth } from "../context/AuthContext";
import { register } from "../api/auth";
import { validatePassword, validateUsername } from "../utils/helper";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthForm from "../components/AuthForm";

// Build login page lol
const RegisterPage = (): React.ReactNode => {
  const { handleLogin } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = (username: string, password: string) => {
    if (!validateUsername(username) || !validatePassword(password)) return;

    register(username, password).then(({ status, message }) => {
      if (status) {
        showToast("success", "Successfully registered account");
        handleLogin();
      } else {
        showToast("error", message);
      }
    });
  };

  return (
    <div className="text-white h-full m-5 flex flex-col gap-3 mt-10">
      <h1 className=" text-center text-3xl ml-5">Login</h1>
      <p className="text-center ml-5">Hi welcome back!</p>
      <AuthForm buttonTitle="Register" onSubmit={handleSubmit} />
      <p className="text-center">
        Already have an account?{" "}
        <Link className="text-blue-600" to={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
