import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../Styles/login.css';
import Image18 from "../image/WhatsApp Image 2025-02-14 at 12.11.20_fca74486.jpg";

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const { token, expiresIn, user } = data;
  
        const expirationTime = Date.now() + expiresIn * 1000; // Convert to milliseconds
  
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("tokenExpiration", expirationTime);
  
        setMessage("Login successful");
        window.location.href = "/dashboard"; // Redirect to Dashboard
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Server error. Try again later.");
    }
  };
  
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src={Image18} alt="Login Illustration" />
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {message && <p className="message">{message}</p>}

   
          <div className="register-link">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
          
          <div className="register-link">
            Forgot password? <Link to="/forgot-password">reste now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
