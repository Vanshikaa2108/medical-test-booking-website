import { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import { FaTimes, FaSpinner, FaDownload, FaEye, FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaArrowLeft, FaCog, FaBell, FaSearch, FaFilter, FaShare, FaPrint, FaHeartbeat, FaVial, FaStethoscope } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("reports");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setError("Failed to fetch user data");
        if (response.status === 401) {
          handleLogout();
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (imageUrl, testType) => {
    try {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${testType}_Report_${new Date().toISOString().split('T')[0]}.png`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show download success notification
      showNotification(`Downloading ${testType} report...`);
    } catch (error) {
      console.error("Error downloading report:", error);
      showNotification("Error downloading report. Please try again.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handlePrecautionClick = (testType) => {
    setSelectedTest(testType);
  };

  const refreshReports = () => {
    setLoading(true);
    fetchUserProfile();
    showNotification("Refreshing reports...");
  };

  const showNotification = (message, type = "success") => {
    // You can implement a proper notification system here
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const filteredTests = user?.tests?.filter(test => 
    test.testType.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-animation">
            <FaSpinner className="spinner" />
            <div className="pulse-ring"></div>
          </div>
          <p>Loading your dashboard...</p>
          <p className="loading-subtitle">Preparing your medical reports</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <div className="error-icon">
            <FaExclamationTriangle />
          </div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={fetchUserProfile} className="retry-button">
              Try Again
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Background Header with Gradient Overlay */}
      <div className="dashboard-header">
        <img 
          src="https://i.pinimg.com/736x/2f/cf/79/2fcf7943c8fea1a69ded929d01e27d30.jpg" 
          alt="Medical Laboratory" 
          className="dashboard-bg" 
        />
        <div className="header-overlay">
          <div className="header-content">
            <h1> Dashboard</h1>
            <p>Your health reports and test results</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      {user && (
        <div className="profile-section">
          <div className="profile-avatar">
            <img 
              src="https://i.pinimg.com/736x/b9/ad/b2/b9adb2c0c4adfa52f4c68afb4a7a8cc7.jpg" 
              className="avatar-icon" 
              alt="User Profile" 
            />
            <div className="online-status"></div>
          </div>
          <div className="profile-details">
            <div className="profile-info">
              <h2>{user.name}</h2>
              <div className="profile-meta">
                <span className="meta-item">
                  <FaEnvelope className="meta-icon" />
                  {user.email}
                </span>
                <span className="meta-item">
                  <FaPhone className="meta-icon" />
                  {user.mobile}
                </span>
                <span className="meta-item">
                  <FaUserCircle className="meta-icon" />
                  Patient ID: {user.id?.slice(-8) || "N/A"}
                </span>
              </div>
            </div>
            <div className="profile-actions">
              <button onClick={refreshReports} className="refresh-button">
                <FaSpinner className="refresh-icon" />
                Refresh Reports
              </button>
              <button className="settings-button">
                <FaCog />
                Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blood-test">
              <FaHeartbeat />
            </div>
            <div className="stat-content">
              <h3>{user?.tests?.length || 0}</h3>
              <p>Total Tests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <h3>{user?.tests?.filter(t => t.report).length || 0}</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>{user?.tests?.filter(t => !t.report).length || 0}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="dashboard-nav">
        <div className="nav-tabs">
          <button 
            className={`tab-button ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            My Reports
          </button>
          <button 
            className={`tab-button ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Test History
          </button>
          <button 
            className={`tab-button ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </button>
        </div>
        <div className="nav-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search tests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Booked Tests Section */}
      <div className="tests-section">
        <div className="section-header">
          <h2>Your Medical Reports</h2>
          <p>Access and manage your test results</p>
        </div>

        {filteredTests.length > 0 ? (
          <div className="test-grid">
            {filteredTests.map((test, index) => (
              <div key={index} className="test-card">
                <div className="test-header">
                  <div className="test-type-icon">
                    {test.testType.includes("Blood") && <FaVial />}
                    {test.testType.includes("Urine") && <FaStethoscope />}
                    {test.testType.includes("BP") && <FaHeartbeat />}
                  </div>
                  <div className="test-meta">
                    <span className="test-date">
                      <FaCalendarAlt /> {test.date}
                    </span>
                    <span className="test-time">
                      <FaClock /> {test.time}
                    </span>
                  </div>
                </div>

                <div className="test-image-container">
                  {test.report ? (
                    <div className="report-image">
                      <img 
                        src={test.report} 
                        alt={`${test.testType} Report`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="image-overlay">
                        <button className="view-button">
                          <FaEye />
                          View Full Report
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="no-report">
                      <div className="no-report-icon">
                        <FaClock />
                      </div>
                      <p>Report Processing</p>
                      <small>Will be available soon</small>
                    </div>
                  )}
                </div>

                <div className="test-content">
                  <h4 className="test-name">{test.testType}</h4>
                  <div className="test-status">
                    <span className={`status-badge ${test.report ? "completed" : "pending"}`}>
                      {test.report ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </div>

                <div className="test-actions">
                  <button
                    className="action-button precaution"
                    onClick={() => handlePrecautionClick(test.testType)}
                  >
                    <FaEye />
                    Precautions
                  </button>
                  {test.report && (
                    <>
                      <button
                        className="action-button download"
                        onClick={() => downloadReport(test.report, test.testType)}
                      >
                        <FaDownload />
                        Download
                      </button>
                      <button className="action-button share">
                        <FaShare />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-tests">
            <div className="no-tests-icon">
              <FaVial />
            </div>
            <h3>No tests found</h3>
            <p>{searchTerm ? "No tests match your search." : "You haven't booked any tests yet."}</p>
            <button 
              onClick={() => window.location.href = "/book-test"} 
              className="book-test-button"
            >
              Book Your First Test
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="quick-actions">
       
      
     
        <button className="quick-action" onClick={handleLogout}>
          <FaArrowLeft />
          <span>Logout</span>
        </button>
      </div>

      {/* Precaution Modal */}
      {selectedTest && (
        <div className="precaution-modal">
          <div className="modal-backdrop" onClick={() => setSelectedTest(null)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <FaEye className="modal-icon" />
                Precautions for {selectedTest}
              </h3>
              <button 
                className="close-button" 
                onClick={() => setSelectedTest(null)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="precaution-details">
                {selectedTest === "Blood Test" && (
                  <ul>
                    <li>🩸 Fast for 8-12 hours before the test</li>
                    <li>💧 Drink plenty of water</li>
                    <li>🚫 Avoid alcohol 24 hours before</li>
                    <li>💊 Inform about any medications</li>
                    <li>😴 Get adequate rest before test</li>
                  </ul>
                )}
                {selectedTest === "Urine Test" && (
                  <ul>
                    <li>💧 Drink normal amounts of water</li>
                    <li>⚡ Collect mid-stream urine sample</li>
                    <li>🧴 Use sterile container provided</li>
                    <li>🏃 Avoid exercise before test</li>
                    <li>🌅 Collect morning sample if possible</li>
                  </ul>
                )}
                {selectedTest === "BP Test" && (
                  <ul>
                    <li>☕ Avoid caffeine and smoking 30 minutes before</li>
                    <li>😌 Rest for 5 minutes before measurement</li>
                    <li>💺 Sit in a comfortable position</li>
                    <li>👣 Keep feet flat on the floor</li>
                    <li>💬 Avoid talking during measurement</li>
                  </ul>
                )}
                {!["Blood Test", "Urine Test", "BP Test"].includes(selectedTest) && (
                  <div className="general-precautions">
                    <p>📋 Please follow these general instructions:</p>
                    <ul>
                      <li>Follow your doctor's specific instructions</li>
                      <li>Arrive 15 minutes before your appointment</li>
                      <li>Bring any required documents</li>
                      <li>Inform about any allergies or conditions</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-button primary">Print Instructions</button>
              <button 
                className="modal-button secondary"
                onClick={() => setSelectedTest(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;