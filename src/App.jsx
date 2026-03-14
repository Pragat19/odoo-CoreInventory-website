import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import Dashboard from "./features/dashboard/Dashboard";
import Products from "./features/products/Products";

import MainLayout from "./layouts/MainLayout";
import Receipts from "./features/receipts/Receipts";
import Transfers from "./features/transfers/Transfers";
import DeliveryOrders from "./features/delivery/DeliveryOrders";
import Adjustments from "./features/adjustments/Adjustments";
import StockLedger from "./features/ledger/StockLedger";
import ForgotPassword from "./features/authentication/ForgotPassword";
import VerifyOtp from "./features/authentication/VerifyOtp";
import ResetPassword from "./features/authentication/ResetPassword";
import "./App.css";
import Warehouses from "./features/settings/Warehouses";
import MyProfile from "./features/profile/MyProfile";

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />

        <Route
          path="/receipts"
          element={
            <MainLayout>
              <Receipts />
            </MainLayout>
          }
        />

        <Route
          path="/transfers"
          element={
            <MainLayout>
              <Transfers />
            </MainLayout>
          }
        />

        <Route
          path="/delivery"
          element={
            <MainLayout>
              <DeliveryOrders />
            </MainLayout>
          }
        />

        <Route
          path="/adjustments"
          element={
            <MainLayout>
              <Adjustments />
            </MainLayout>
          }
        />

        <Route
          path="/ledger"
          element={
            <MainLayout>
              <StockLedger />
            </MainLayout>
          }
        />

        <Route
          path="/warehouses"
          element={
            <MainLayout>
              <Warehouses />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
              <MyProfile />
            </MainLayout>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}