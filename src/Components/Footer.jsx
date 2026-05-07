import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={styles.footer}>

      <div style={styles.container}>

        <h2 style={styles.logo}>🐾 Pawlify Premium Store</h2>

        <p style={styles.text}>
          The best place for pets, toys, food & love 🐶🐱
        </p>

        {/* NEWSLETTER */}
        <div style={styles.newsletter}>
          <input
            type="email"
            placeholder="Enter your email for updates"
            style={styles.input}
          />
          <button style={styles.subscribe}>
            Subscribe
          </button>
        </div>

        {/* SOCIAL ICONS */}
        <div style={styles.socials}>

          <a href="https://facebook.com" style={styles.icon} className="footer-icon" target="_blank" rel="noopener noreferrer">
  <FaFacebook />
</a>

<a href="https://instagram.com" style={styles.icon} className="footer-icon" target="_blank" rel="noopener noreferrer">
  <FaInstagram />
</a>

<a href="https://twitter.com" style={styles.icon} className="footer-icon" target="_blank" rel="noopener noreferrer">
  <FaTwitter />
</a>

<a href="https://tiktok.com" style={styles.icon} className="footer-icon" target="_blank" rel="noopener noreferrer">
  <FaTiktok />
</a>

<a href="https://youtube.com" style={styles.icon} className="footer-icon" target="_blank" rel="noopener noreferrer">
  <FaYoutube />
</a>

        </div>

        {/* DIVIDER */}
        <div style={styles.line}></div>

        {/* BOTTOM */}
        <p style={styles.dev}>
          Developed by <b>Alvin K.W</b> 💻
        </p>

        <p style={styles.copy}>
          © {new Date().getFullYear()} Pawlify. All rights reserved.
        </p>

        {/* BACK TO TOP */}
        <button onClick={scrollTop} style={styles.topBtn}>
          ⬆ Back to Top
        </button>

      </div>

    </footer>
  );
};

export default Footer;

// =======================
// PREMIUM STYLES
// =======================
const styles = {

  footer: {
    background: "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)",
    color: "white",
    padding: "50px 20px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  container: {
    maxWidth: "900px",
    margin: "auto",
  },

  logo: {
    color: "#ff6b81",
    fontSize: "24px",
    marginBottom: "10px",
    letterSpacing: "1px",
  },

  text: {
    color: "#cbd5e1",
    marginBottom: "20px",
  },

  newsletter: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    width: "250px",
    outline: "none",
  },

  subscribe: {
    padding: "10px 15px",
    background: "#ff6b81",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "10px",
  },

  icon: {
  fontSize: "22px",
  background: "#1f2937",
  padding: "12px",
  borderRadius: "50%",
  color: "white",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.4s ease",
  boxShadow: "0 0 0 rgba(255, 107, 129, 0)",
},

  line: {
    height: "1px",
    background: "#334155",
    margin: "25px 0",
  },

  dev: {
    color: "#94a3b8",
    marginBottom: "5px",
  },

  copy: {
    color: "#64748b",
    fontSize: "13px",
  },

  topBtn: {
    marginTop: "20px",
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",
    background: "#ff6b81",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  
};