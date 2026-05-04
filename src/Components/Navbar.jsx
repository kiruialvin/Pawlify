import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ cartCount, isAdmin }) {
  const [hovered, setHovered] = useState(null);

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      background: "white",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    },
    links: {
      display: "flex",
      gap: "20px",
      alignItems: "center"
    },
    link: (index) => ({
      textDecoration: "none",
      color: hovered === index ? "#2563eb" : "#333",
      transform: hovered === index ? "scale(1.1)" : "scale(1)",
      transition: "0.3s"
    }),
    adminLink: {
      color: "red",
      fontWeight: "bold",
      textDecoration: "none",
      marginLeft: "10px"
    }
  };

  const paths = [
    "/",
    "/shop",
    "/products",
    "/cart",
    "/signin",
    "/signup",
    "/add-pet"
  ];

  const labels = [
    "Home",
    "Shop",
    "Products",
    "Cart",
    "Sign In",
    "Sign Up",
    "Add Pet"
  ];

  return (
    <div style={styles.nav}>
      <h1>PetMatch 🐾</h1>

      <div style={styles.links}>

        {/* NORMAL LINKS */}
        {paths.map((path, i) => (
          <Link
            key={i}
            to={path}
            style={styles.link(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {labels[i]}
          </Link>
        ))}

        {/* 🐾 ADMIN ONLY LINK */}
        {isAdmin && (
          <Link to="/admin" style={styles.adminLink}>
            Admin Dashboard ⚙️
          </Link>
        )}

      </div>
    </div>
  );
}

export default Navbar;