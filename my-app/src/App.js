import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homes from "./components/Home";
import Footers from "./components/Footer";
import Navbars from "./components/Navbar";
import Abouts from "./components/About";
import Register from "./components/register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import BookSlot from "./components/BookSlot";
import Admin from "./components/Admin";
import Doctors from "./components/Doctor";
import Main from "./components/main";
import Contact from "./components/Contact";
import ForgotPassword from "./components/ForgotPassword";
import AutoLogout from "./components/AutoLogout"; // Auto Logout Component

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Login />;
};

function App() {
  return (
    <Router>
      <>
        <Navbars />
        <AutoLogout />  {/* Auto logout if token expires */}

        <Routes>
          <Route path="/" element={<Homes />} />
          <Route path="/about" element={<Abouts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/book-test" element={<BookSlot />} />
          <Route path="/ai" element={<Main />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/doctor" element={<ProtectedRoute element={<Doctors />} />} />

        </Routes>
        <Footers />
      </>
    </Router>
  );
}

export default App;
