import React, { useState } from "react";
import "../assets/css/contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Replace this with your WhatsApp number (no + or spaces)
    const phoneNumber = "919315529789"; // Example: 91 + your 10-digit number

    // ✅ Create the message to send
    const message = `Hello, I would like to contact you:%0A
Name: ${formData.name}%0A
Email: ${formData.email}%0A
Message: ${formData.message}`;

    // ✅ WhatsApp API link
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // ✅ Open WhatsApp chat
    window.open(whatsappURL, "_blank");

    // Optionally clear form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Reach out anytime.</p>
        </div>
        <div className="fade-overlay"></div>
      </section>

      {/* Info Cards */}
      <section className="contact-info">
        <div className="info-card">
          <h3>📍 Address</h3>
          <p>जनपद बुलंदशहर तहसील स्याना, <br/>पोस्ट बुगरासी  <br/>ग्राम रवानी कटीरी</p>
        </div>
        <div className="info-card">
          <h3>📞 Call Us</h3>
          <p>+91 9910307602 / 9315529789</p>
        </div>
        <div className="info-card">
          <h3>✉️ Email</h3>
          <p>officialvshf@gmail.com</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="main-btn submit-btn">
            <p>Send Message</p>
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
