import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedPage from "./pages/ProtectedPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App(): React.ReactNode {
  return (
    <>
      <nav className="p-9 border-b-2 border-[#33353F] flex justify-center items-center">
        <h1 className="font-bold text-2xl text-oyen">Oyen Authentication</h1>
      </nav>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<ProtectedPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
