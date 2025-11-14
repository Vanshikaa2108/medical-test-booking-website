import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/admin.css";
import { FaSpinner } from "react-icons/fa";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [reportImage, setReportImage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fixed admin credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "password123";

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users || []);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      alert("Invalid username or password!");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsers([]);
    setUsername("");
    setPassword("");
    localStorage.removeItem("adminAuth");
  };

  // Check if admin is already logged in
  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAddReport = async () => {
    if (!selectedUser || selectedTestIndex === null || !reportImage) {
      alert("Please select a user, test, and upload a report image.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", selectedUser);
    formData.append("testIndex", selectedTestIndex);
    formData.append("reportImage", reportImage);

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/add-report`, {
        method: "POST",
        body: formData,
        // Note: Don't set Content-Type header for FormData, browser will set it automatically
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Report added successfully!");
        closeModal();
        fetchUsers(); // Refresh the user list
      } else {
        alert(data.message || "Failed to add report.");
      }
    } catch (error) {
      console.error("Error adding report:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setSelectedTestIndex(null);
    setReportImage(null);
  };

  const downloadUserReports = (user) => {
    const userData = {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      tests: user.tests
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user.name}_reports.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="dashboard-container">
        <div className="admin-login">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter admin username"
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Admin Panel Header */}
      <div className="dashboard-header">
        <img
          src="https://i.pinimg.com/736x/2f/cf/79/2fcf7943c8fea1a69ded929d01e27d30.jpg"
          alt="Admin Background"
          className="dashboard-bg"
        />
      </div>

      {/* Admin Profile Section */}
      <div className="profile-section">
        <div className="profile-avatar">
          <img
            src="https://i.pinimg.com/736x/b9/ad/b2/b9adb2c0c4adfa52f4c68afb4a7a8cc7.jpg"
            className="avatar-icon"
            alt="Admin Icon"
          />
        </div>
        <div className="profile-details">
          <h2>Admin Panel</h2>
          <p>Manage Users & Reports</p>
          <div className="admin-actions">
            <button onClick={fetchUsers} className="refresh-btn" disabled={loading}>
              Refresh Data
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Tests</h3>
          <p>{users.reduce((total, user) => total + (user.tests?.length || 0), 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Reports Uploaded</h3>
          <p>{users.reduce((total, user) => total + (user.tests?.filter(test => test.report).length || 0), 0)}</p>
        </div>
      </div>

      {/* User Data Section */}
      <div className="tests-section3">
        {loading ? (
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>Loading users...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={fetchUsers} className="retry-btn">
              Try Again
            </button>
          </div>
        ) : users.length > 0 ? (
          <div className="test-grid3">
            {users.map((user) => (
              <div key={user._id} className="test-card3">
                <div className="user-header">
                  <div className="user-info3">
                    <h3>{user.name}</h3>
                    <p>📧 {user.email}</p>
                    <p>📱 {user.mobile}</p>
                  </div>
                  <button 
                    onClick={() => downloadUserReports(user)}
                    className="download-user-btn"
                    title="Download user reports"
                  >
                    📥 Download Data
                  </button>
                </div>

                <div className="user-tests3">
                  <h4>Booked Tests ({user.tests?.length || 0})</h4>
                  {user.tests?.length > 0 ? (
                    <div className="test-list-container">
                      <ul className="test-list3">
                        {user.tests.map((test, index) => (
                          <li key={index} className="test-item3">
                            <div className="test-details">
                              <p><strong>Test Type:</strong> {test.testType}</p>
                              <p><strong>Date:</strong> {test.date} | <strong>Time:</strong> {test.time}</p>
                              <p>
                                <strong>Report Status:</strong> 
                                <span className={`status ${test.report ? 'completed' : 'pending'}`}>
                                  {test.report ? 'Uploaded' : 'Pending'}
                                </span>
                              </p>
                            </div>
                            <div className="test-actions">
                              {test.report ? (
                                <div className="report-actions">
                                  <button 
                                    className="view-report-btn"
                                    onClick={() => window.open(test.report, "_blank")}
                                  >
                                    👁️ View Report
                                  </button>
                                  <button 
                                    className="download-report-btn"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = test.report;
                                      link.download = `${user.name}_${test.testType}_report.png`;
                                      link.click();
                                    }}
                                  >
                                    📥 Download
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="add-report-btn3"
                                  onClick={() => {
                                    setSelectedUser(user._id);
                                    setSelectedTestIndex(index);
                                  }}
                                  disabled={loading}
                                >
                                  📤 Upload Report
                                </button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="no-tests">No tests booked by this user.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-users">
            <p>No users found.</p>
          </div>
        )}
      </div>

      {/* Upload Report Modal */}
      {selectedUser !== null && (
        <div className="report-upload-modal">
          <div className="modal-content">
            <h3>Upload Report</h3>
            <p>For: {users.find(u => u._id === selectedUser)?.name} - Test #{selectedTestIndex + 1}</p>
            
            <div className="file-input-group">
              <label>Select Report Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReportImage(e.target.files[0])}
                className="file-input"
              />
              {reportImage && (
                <p className="file-info">Selected: {reportImage.name}</p>
              )}
            </div>

            <div className="image-preview">
              {reportImage && (
                <img 
                  src={URL.createObjectURL(reportImage)} 
                  alt="Preview" 
                  className="preview-image"
                />
              )}
            </div>

            <div className="modal-buttons">
              <button 
                className="submit-btn" 
                onClick={handleAddReport}
                disabled={!reportImage || loading}
              >
                {loading ? "Uploading..." : "Upload Report"}
              </button>
              <button 
                className="close-btn" 
                onClick={closeModal}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;