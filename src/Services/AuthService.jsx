import axios from "axios";
import { removeUser } from "../Slices/UserSlice";

// const base_url = "http://localhost:8080/auth/";
const base_url = "https://jobportal-backend-dnyd.onrender.com/auth/";

const loginUser = async (login) => {
  return axios
    .post(`${base_url}login`, login)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const navigateToLogin = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  removeUser();
  navigate("/login");
};

export { loginUser, navigateToLogin };
