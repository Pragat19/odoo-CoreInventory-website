export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: "user/login",
    REGISTER: "user/register",
    LOGOUT: "user/logout",
    FORGOT_PASSWORD: "user/forgotPassword",
    VERIFY_OTP: "user/verifyOtp",
    RESET_PASSWORD: "user/resetPassword",
  },

  PRODUCT: {
    STORE: "product/store",
    LIST: "product/list",
    DELETE: (id) => `product/delete/${id}`,
    UPDATE: (id) => `product/update/${id}`,
  },

  WAREHOUSES: {
    LIST: "/warehouses",
  },

  MASTER_CATEGORY: {
    LIST: "master-category/list",
  },

};