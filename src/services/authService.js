import { apiRequest } from "./api";
import { API_ENDPOINTS } from "./endpoints";

export const registerUser = async (data) => {

  return apiRequest(
    API_ENDPOINTS.AUTH.REGISTER,
    "POST",
    data
  );

};

export const loginUser = async (data) => {

  return apiRequest(
    API_ENDPOINTS.AUTH.LOGIN,
    "POST",
    data
  );

};

export const forgotPassword = async (email) => {

  return apiRequest(
    API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
    "POST",
    { email }
  );
};

export const verifyOtp = async (email, otp) => {

  return apiRequest(
    API_ENDPOINTS.AUTH.VERIFY_OTP,
    "POST",
    { email, otp }
  );

};

export const resetPassword = async (data) => {

  return apiRequest(
    API_ENDPOINTS.AUTH.RESET_PASSWORD,
    "POST",
    data
  );

};