import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedPage from "./pages/ProtectedPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";

function App(): React.ReactNode {
  const { isLoggedIn, handleLogout } = useAuth();
  return (
    <>
      <nav className="p-9 border-b-2 border-[#33353F] flex items-center gap justify-evenly">
        <h1 className="font-bold text-2xl text-oyen">Oyen Authentication</h1>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="self-end hover:brightness-90 bg-oyen px-5 text-white py-2 rounded-md outline-none"
          >
            Logout
          </button>
        )}
      </nav>
      <main className="h-full">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<ProtectedPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
