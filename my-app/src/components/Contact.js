import React, { useState } from "react";
import "../Styles/contact.css"; // Import your CSS file
import swal from "sweetalert"; // SweetAlert for form submission
import { IonIcon } from "@ionic/react"; // Ionicons for icons

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.message) {
      swal("Error", "All fields are required!", "error");
    } else {
      swal("Success", "Message sent successfully!", "success");
      setFormData({ firstName: "", lastName: "", email: "", mobile: "", message: "" });
    }
  };

  return (
    <div className="contactUs body">
      <div className="title">
        <h2>Get in Touch</h2>
      </div>
      <div className="box">
        {/* Contact Form */}
        <div className="contact form">
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="formBox">
              <div className="row50">
                <div className="inputBox">
                  <span>First Name</span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputBox">
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row50">
                <div className="inputBox">
                  <span>Email Address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputBox">
                  <span>Mobile</span>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile No."
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row100">
                <div className="inputBox">
                  <span>Message</span>
                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="row100">
                <div className="inputBox">
                  <input type="submit" value="Send" />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="contact info">
          <h3>Contact Information</h3>
          <div className="infoBox">
            <div>
              <span><IonIcon name="location" /></span>
              <p>Parul University, Vadodara, Gujarat<br />India</p>
            </div>
            <div>
              <span><IonIcon name="mail" /></span>
              <a href="mailto:loremipsum@email.com">loremipsum@email.com</a>
            </div>
            <div>
              <span><IonIcon name="call" /></span>
              <a href="tel:+91 7083987123">+91 7083987123</a>
            </div>
            <ul className="sci">
              <li><a href="#"><IonIcon name="logo-facebook" /></a></li>
              <li><a href="#"><IonIcon name="logo-twitter" /></a></li>
              <li><a href="#"><IonIcon name="logo-linkedin" /></a></li>
              <li><a href="#"><IonIcon name="logo-instagram" /></a></li>
            </ul>
          </div>
        </div>

        {/* Google Map */}
        <div className="contact map">
          <iframe
            src="https://maps.app.goo.gl/eXCs7HBvNDgHfjjM9"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
