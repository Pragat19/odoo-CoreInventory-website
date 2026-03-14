import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import Dashboard from "./features/dashboard/Dashboard";

import MainLayout from "./layouts/MainLayout";

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}