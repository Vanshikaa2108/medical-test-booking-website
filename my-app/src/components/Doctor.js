import React from "react";
import { useState } from "react";
import "../Styles/doctorstyle.css";
import Image6 from "../image/background.png";
import Image7 from "../image/doctor.png";
import Image8 from "../image/gallery1.png";
import Image9 from "../image/gallery2.png";
import Image10 from "../image/gallery3.png";
import Image11 from "../image/gallery4.png";
import Image12 from "../image/gallery5.png";
import Image13 from "../image/gallery6.png";
import Image14 from "../image/team1.png";
import Image15 from "../image/team2.png";
import Image16 from "../image/team3.png";
import Image17 from "../image/team4.png";

const Doctors = () => {
 
  return (
    <div>
      <header className="main-header">
      

        <div className="menu-icons">
          <div className="inner-menu-icons">
            <i className="far fa-clock"></i>
            <div className="inner-menu-content">
              <span>Work time : 09:00</span>
              <span>Saturday and Sunday Closed</span>
            </div>
          </div>
          <div className="inner-menu-icons">
            <i className="fas fa-envelope"></i>
            <div className="inner-menu-content">
              <span>Mail us</span>
              <span>free@gmail.com</span>
            </div>
          </div>
          <div className="inner-menu-icons">
            <i className="fas fa-phone-alt"></i>
            <div className="inner-menu-content">
              <span>Call us</span>
              <span>+92 0225252</span>
            </div>
          </div>
        </div>
      </header>

      <div className="second-menu-icons">
        <i className="fab fa-youtube"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-linkedin"></i>
        <i id="menu-bar" className="fas fa-bars"></i>
      </div>

      <section className="background-image">
            <img className="background-image" src={Image6} alt="Medical Checkup" />
        <div className="background-content">
          <h2>We have Best Medicare <br /> Plan Option for You</h2>
          <a href="#">Read more</a>
        </div>
      </section>

      <div className="our-services">
        <h1>Our <span>Services</span></h1>
        <div className="main-services">
          {[
            { icon: "fas fa-users", title: "Best Treatment" },
            { icon: "fas fa-clinic-medical", title: "Emergency Help" },
            { icon: "fas fa-user-tie", title: "Medical Staff" },
            { icon: "fas fa-ambulance", title: "Qualified Doctor" }
          ].map((service, index) => (
            <div className="inner-main-services" key={index}>
              <i className={service.icon}></i>
              <h2>{service.title}</h2>
              <p></p>
            </div>
          ))}
        </div>
      </div>

      <div className="why-chose-us">
        <h1>Why Choose Us</h1>
        <div className="main-choseus">
          <img src={Image7} alt="Doctor" />
          <h3>At [Your Lab Name], we are committed to providing accurate, reliable, and timely diagnostic services to ensure your well-being. Our state-of-the-art pathology lab is equipped with advanced technology and automated testing systems, ensuring precise results for every test. We take pride in our highly qualified medical professionals, who work diligently to deliver comprehensive health assessments with a focus on quality and patient care.

We offer a wide range of diagnostic tests, including blood tests, genetic screening, infection panels, and more, all conducted in a hygienic and controlled environment. With quick turnaround times, affordable pricing, and seamless digital report access, we make lab testing convenient and hassle-free. Choose us for trusted healthcare solutions that prioritize your health and safety.</h3>
        </div>

      </div>

      <div className="our-gallery">
  <h1>Our <span>Gallery</span></h1>
  <div className="main-gallery">
    <div className="inner-gallery"><img src={Image8} alt="Gallery 1" /></div>
    <div className="inner-gallery"><img src={Image9} alt="Gallery 2" /></div>
    <div className="inner-gallery"><img src={Image10} alt="Gallery 3" /></div>
    <div className="inner-gallery"><img src={Image11} alt="Gallery 4" /></div>
    <div className="inner-gallery"><img src={Image12} alt="Gallery 5" /></div>
    <div className="inner-gallery"><img src={Image13} alt="Gallery 6" /></div>
  </div>
</div>


<div className="our-team">
  <h1>Our <span>Team</span></h1>
  <div className="main-team">
    <div className="inner-team">
      <img src={Image14} alt="Dr. Pratik Adhav" />
      <h2>Dr. Pratik Adhav</h2>
      <div className="social">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-linkedin"></i>
      </div>
    </div>
    <div className="inner-team">
      <img src={Image15} alt="Dr. Omkar Ugale" />
      <h2>Dr. Omkar Ugale</h2>
      <div className="social">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-linkedin"></i>
      </div>
    </div>
    <div className="inner-team">
      <img src={Image16} alt="Dr. Vanshika" />
      <h2>Dr. Vanshika</h2>
      <div className="social">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-linkedin"></i>
      </div>
    </div>
    <div className="inner-team">
      <img src={Image17} alt="Dr. Hitesh Pawar" />
      <h2>Dr. Hitesh Pawar</h2>
      <div className="social">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-linkedin"></i>
      </div>
    </div>
  </div>
</div>

      <div className="our-footer">
        <div className="main-footer">
          <div className="inner-footer">
            <h1>Quick Links</h1>
            <div className="get-in-touch mysocial">
              <i className="fas fa-envelope-square"></i>
              <span>free@gmail.com</span>
            </div>
            <div className="get-in-touch mysocial">
              <i className="fas fa-map-marker-alt"></i>
              <span>free@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
