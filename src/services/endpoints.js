export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: "user/login",
    REGISTER: "user/register",
    LOGOUT: "user/logout",
    FORGOT_PASSWORD: "user/forgotPassword",
    VERIFY_OTP: "user/verifyOtp",
    RESET_PASSWORD: "user/resetPassword",
  },

  PRODUCTS: {
    LIST: "/products",
    CREATE: "/products",
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
  },

  WAREHOUSES: {
    LIST: "/warehouses",
  },

};