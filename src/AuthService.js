import axios from "axios";

const API_URL = "https://jobboard-0da3.onrender.com/api";

const AuthService = {
  register: async (username, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error; // Rethrow the error for the calling component to handle
    }
  },
  login: (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
  },

  logout: () => {
    return axios.get(`${API_URL}/logout`);
  },

  checkAuth: () => {
    return axios.get(`${API_URL}/check-auth`);
  },
};

export default AuthService;
