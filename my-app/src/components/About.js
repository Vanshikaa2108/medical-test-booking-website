import React, { useState } from "react";
import { FaBook, FaGlobe, FaPenNib } from "react-icons/fa";
import "../Styles/AboutUs.css";

const AboutUs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", text: "" });

  const openModal = (title, text) => {
    setModalContent({ title, text });
    setModalOpen(true);
  };

  return (
    <section className="about-us">
      <h1>ABOUT US</h1>

      <div className="about-columns">
        {/* Mission */}
        <div className="column" onClick={() => openModal("MISSION", "Our mission is to provide the best services by ensuring excellence in all aspects of our operations.")}>
          <div className="icon"><FaBook /></div>
          <h2>MISSION</h2>
        </div>

        {/* Vision */}
        <div className="column" onClick={() => openModal("VISION", "Our vision is to be the leading organization in our field, inspiring innovation and success globally.")}>
          <div className="icon"><FaGlobe /></div>
          <h2>VISION</h2>
        </div>

        {/* Achievements */}
        <div className="column" onClick={() => openModal("ACHIEVEMENTS", "We have successfully accomplished numerous milestones, impacting thousands of lives and businesses worldwide.")}>
          <div className="icon"><FaPenNib /></div>
          <h2>ACHIEVEMENTS</h2>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalContent.title}</h2>
            <p>{modalContent.text}</p>
            <button onClick={() => setModalOpen(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}

    
    </section>
  );
};

export default AboutUs;
