import { useState, useEffect } from "react";
import "../Styles/bookslot.css";
import Image20 from "../image/images.jpeg";

const BookSlot = () => {
  const [testType, setTestType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user._id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    if (!token) {
      setMessage("Please log in first.");
      return;
    }

    if (!userId) {
      setMessage("User not found. Please log in again.");
      return;
    }

    const formData = { userId, testType, date, time };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/book-test`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Test booked successfully!");
        setTestType("");
        setDate("");
        setTime("");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="book-slot-container">
      <div className="image-container">
        <img src={Image20} alt="Test Booking" />
      </div>
      <div className="form-container">
        <h2>Book a Test</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Select Test:
            <select value={testType} onChange={(e) => setTestType(e.target.value)} required>
              <option value="">Select</option>
              <option value="Blood Test">Blood Test</option>
              <option value="Urine Test">Urine Test</option>
              <option value="BP Test">BP Test</option>
            </select>
          </label>
          <label>
            Select Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label>
            Select Time:
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </label>
          <button type="submit">Book Test</button>
        </form>
      </div>
    </div>
  );
};

export default BookSlot;
