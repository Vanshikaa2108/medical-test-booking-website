import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/register.css';
import Image19 from "../image/WhatsApp Image 2025-02-14 at 12.11.20_fca74486.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!formData.email) {
      setMessage("Please enter your email first");
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, purpose: 'registration' }),
      });

      const data = await response.json();
      
      if (data.success) {
        setOtpSent(true);
        setMessage("OTP sent to your email. Check your inbox and spam folder.");
        console.log("Debug OTP:", data.debug); // Remove in production
      } else {
        setMessage(`Failed to send OTP: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP");
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          otp, 
          purpose: 'registration' 
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setIsOtpVerified(true);
        setMessage("OTP Verified! You can now register.");
      } else {
        setMessage(`OTP verification failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      setMessage("Please verify OTP first.");
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src={Image19} alt="Login Illustration" />
        </div>
        <div className="login-form">
          <h1>Create an Account</h1>
          
          {message && (
            <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading || isOtpVerified}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading || otpSent}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="text"
                id="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
                disabled={loading || isOtpVerified}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading || isOtpVerified}
              />
            </div>
            
            {otpSent && !isOtpVerified && (
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={loading}
                />
                <button 
                  type="button" 
                  onClick={verifyOtp} 
                  className="otp-button"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}
            
            <div className="button-group">
              {!otpSent && (
                <button 
                  type="button" 
                  onClick={sendOtp} 
                  className="otp-button"
                  disabled={loading || !formData.email}
                >
                  {loading ? "Sending..." : "Send OTP to Email"}
                </button>
              )}
              
              {isOtpVerified && (
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              )}
            </div>
          </form>
          
          <div className="register-link">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;