import axios from 'axios';
const AxiosService = axios.create({
  baseURL: 'https://food-skrestaurant-backend.onrender.com',
  headers: {
    "Content-Type": "application/json",
  },
});
//https://food-app-backend-f6gp.onrender.com
// AxiosService.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
//});

export default AxiosService;
