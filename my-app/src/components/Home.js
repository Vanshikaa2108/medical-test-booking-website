import React, { useRef } from "react";
import Image1 from "../image/WhatsApp Image 2025-02-14 at 12.11.20_fca74486.jpg";
import { FaVial, FaHeartbeat, FaDna, FaLungs, FaUserMd, FaVirus } from "react-icons/fa";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Image3 from "../image/WhatsApp Image 2025-02-14 at 12.26.50_2773caa8.jpg";
import Image4 from "../image/WhatsApp Image 2025-02-14 at 12.23.28_d61d7a40.jpg";

import Image5 from "../image/WhatsApp Image 2025-02-14 at 12.31.54_6b4f57da.jpg";

export default function Home() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Your Health, Our Priority</h1>
            <p>Get reliable and accurate diagnostic services for a healthier life.</p>
            <a href="#" className="btn">Explore Tests</a>
          </div>
          <div className="hero-image">
            <img src={Image1} alt="Medical Checkup" />
          </div>
        
        </div>
      </section>

      <section className="test-list">
      <h3 className="section-title">Test List</h3>
      <h2 className="test-heading">
        We offer a comprehensive coverage of more than 80+ medical tests with reliable results
      </h2>

      <div className="test-container">
        <button className="scroll-left" onClick={scrollLeft}>
          <BiLeftArrow size={24} />
        </button>

        <div className="test-wrapper" ref={scrollRef}>
          <div className="test-card">
            <FaVial className="test-icon" />
            <h4>Blood Test</h4>
            <p>Checking various blood parameters</p>
          </div>

          <div className="test-card">
            <FaHeartbeat className="test-icon" />
            <h4>ECG</h4>
            <p>Recording electrical activity</p>
          </div>

          <div className="test-card">
            <FaDna className="test-icon" />
            <h4>Genetic Test</h4>
            <p>Analyzing DNA for inherited traits</p>
          </div>

          <div className="test-card">
            <FaLungs className="test-icon" />
            <h4>Respiratory Test</h4>
            <p>Assessing lung function</p>
          </div>

          <div className="test-card">
            <FaUserMd className="test-icon" />
            <h4>Diabetes Screening</h4>
            <p>Measuring blood sugar levels</p>
          </div>

          <div className="test-card">
            <FaVirus className="test-icon" />
            <h4>Infection Panel</h4>
            <p>Testing for bacteria and viruses</p>
          </div>
        </div>

        <button className="scroll-right" onClick={scrollRight}>
          <BiRightArrow size={24} />
        </button>
      </div>
    </section>
      <section className="find-test">
        <div className="content">
          <h4 className="section-title">Find Test</h4>
          <h2 className="heading">With more than 80+ tests covered and reliable results, you can be sure that your health is in the best hands.</h2>
          <p className="description">
            With certified medical professionals and a 98% customer satisfaction rate, Dr.PathLab ensures precise and timely test results. Our extensive network of labs provides high-quality diagnostics with up to 70% lower costs than other providers.
          </p>
          <ul className="features">
            <li><i className="fas fa-check-circle"></i> <strong>100% free app</strong> designed to help you find the right test.</li>
            <li><i className="fas fa-check-circle"></i> <strong>Available 900+ labs</strong> with expert specialists.</li>
          </ul>
          <button className="cta-btn"><a href="findtest.html">See the test list</a></button>
        </div>
        <div className="image-container">
          <img src={Image3} alt="Doctor Image" className="doctor-img" />
        </div>
      </section>

      <section className="schedule-section">
        <div className="schedule-container">
          <div className="schedule-image">
            <img src={Image4}alt="Doctor Consultation" />
          </div>
          <div className="schedule-content">
            <h4 className="section-subtitle">Make a Schedule</h4>
            <h2 className="section-title">
              Make a schedule in advance <br /> with the available doctor
            </h2>
            <p className="description">
              Dr.PathLab provides a seamless way to schedule doctor consultations. 
              Taking care of your health has never been easier with online check-ups 
              and convenient appointment booking. Secure a spot with a medical expert today.
            </p>
            <ul className="schedule-list">
              <li><i className="fas fa-check-circle"></i> <strong>Make a schedule online is easy</strong></li>
              <li><i className="fas fa-check-circle"></i> <strong>Easy to connect with the nearest lab</strong></li>
            </ul>
            <a href="#" className="btn-primary">Make Schedule Now!</a>
          </div>
        </div>
      </section>

      <section className="patient-feedback">
        <h2>Our patients feedback about us</h2>
        <p className="subtitle">their impression after using our service</p>
        <div className="feedback-slider">
          <div className="feedback-card">
            <div className="feedback-image">
              <img src={Image5} alt="Patient" />
            </div>
            <div className="feedback-content">
              <p className="feedback-text">"Dr.PathLab provided me with excellent service. The home collection was seamless, and my reports were accurate and delivered on time. Highly recommended!"</p>
              <p className="feedback-name">Raj Singh</p>
              <p className="feedback-source">Google</p>
            </div>
          </div>
          <div className="feedback-card">
            <div className="feedback-image">
              <img src="https://via.placeholder.com/150" alt="Patient" />
            </div>
            <div className="feedback-content">
              <p className="feedback-text">"Amazing experience! The tests were easy to book, and the reports were very detailed. The service was top-notch!"</p>
              <p className="feedback-name">Anita Sharma</p>
              <p className="feedback-source">Google</p>
            </div>
          </div>
          <div className="feedback-card">
            <div className="feedback-image">
              <img src="https://via.placeholder.com/150" alt="Patient" />
            </div>
            <div className="feedback-content">
              <p className="feedback-text">"Fast and reliable results. The customer service was very supportive throughout the process."</p>
              <p className="feedback-name">Amit Verma</p>
              <p className="feedback-source">Google</p>
            </div>
          </div>
          <div className="feedback-card">
            <div className="feedback-image">
              <img src="https://via.placeholder.com/150" alt="Patient" />
            </div>
            <div className="feedback-content">
              <p className="feedback-text">"I loved the convenience of getting my tests done from home. Excellent service and quick reports!"</p>
              <p className="feedback-name">Neha Kapoor</p>
              <p className="feedback-source">Google</p>
            </div>
          </div>
          <div className="feedback-card">
            <div className="feedback-image">
              <img src="https://via.placeholder.com/150" alt="Patient" />
            </div>
            <div className="feedback-content">
              <p className="feedback-text">"Very professional and hygienic lab services. The reports were accurate and easy to understand."</p>
              <p className="feedback-name">Rahul Mehta</p>
              <p className="feedback-source">Google</p>
            </div>
          </div>
        </div>
        <div className="feedback-navigation">
          <button className="prev-btn">&#8592;</button>
          <button className="next-btn">&#8594;</button>
        </div>
      </section>
    </>
  );
}