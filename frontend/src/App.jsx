import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* General Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/student/home" element={<StudentDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
