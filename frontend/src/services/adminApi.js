import axios from "axios";

const ADMIN_API = axios.create({
  baseURL: "http://localhost:4000/api/admin",
});

// Add token automatically
ADMIN_API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

const AUTH_API = axios.create({
  baseURL: "http://localhost:4000/api/auth",
});

AUTH_API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const adminLogin = (data) => AUTH_API.post("/login", data);
export const login = (data) => AUTH_API.post("/login", data);
export const fetchStudents = () => ADMIN_API.get("/students");
export const fetchAdminProfile = () => ADMIN_API.get("/me");
export const postJob = (data) => ADMIN_API.post("/jobs", data);
export const getJobs = () => ADMIN_API.get("/jobs");
