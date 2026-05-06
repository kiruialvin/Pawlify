import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const pets = [
  {
    name: "Buddy",
    type: "Golden Retriever",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16"
  },
  {
    name: "Milo",
    type: "Tabby Cat",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a"
  },
  {
    name: "Luna",
    type: "Husky",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
  },

  // 🐶 MORE DOGS ADDED
  {
    name: "Max",
    type: "German Shepherd",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2VybWFuJTIwc2hlcGhlcmR8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Charlie",
    type: "Beagle",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1"
  },
  {
    name: "Rocky",
    type: "Bulldog",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d"
  },
  {
    name: "Bella",
    type: "Poodle",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783"
  },
  {
    name: "Cooper",
    type: "Labrador",
    image: "https://plus.unsplash.com/premium_photo-1722859221349-26353eae4744?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1lcmljYW4lMjBidWxsZG9nfGVufDB8fDB8fHww"
  },
  
];
  // ⭐ CAROUSEL STATE
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % pets.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((index + 1) % pets.length);
  const prev = () =>
    setIndex((index - 1 + pets.length) % pets.length);

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "60px 20px",
      textAlign: "center",
      background: "linear-gradient(135deg, #e0f2ff, #f8fbff)"
    },

    hero: {
      maxWidth: "700px",
      margin: "0 auto"
    },

    title: {
      fontSize: "48px",
      fontWeight: "bold",
      color: "#1e293b",
      marginBottom: "10px"
    },

    text: {
      color: "#64748b",
      fontSize: "18px",
      marginBottom: "25px"
    },

    button: {
      display: "inline-block",
      padding: "12px 28px",
      background: "linear-gradient(45deg, #2563eb, #3b82f6)",
      color: "white",
      borderRadius: "14px",
      textDecoration: "none",
      fontWeight: "bold"
    },

    // ⭐ CAROUSEL STYLES
    carousel: {
      position: "relative",
      maxWidth: "600px",
      margin: "50px auto",
      overflow: "hidden",
      borderRadius: "18px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
    },

    slide: {
      width: "100%",
      height: "320px",
      objectFit: "cover",
      borderRadius: "18px",
      transition: "0.5s ease"
    },

    arrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgba(0,0,0,0.4)",
      color: "white",
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
      borderRadius: "50%"
    },

    left: { left: "10px" },
    right: { right: "10px" },

    petGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "25px",
      marginTop: "60px",
      maxWidth: "1000px",
      marginLeft: "auto",
      marginRight: "auto"
    },

    card: {
      background: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(10px)",
      borderRadius: "18px",
      padding: "15px",
      transition: "0.3s",
      cursor: "pointer"
    },

    image: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "12px"
    }
  };

  return (
    <div style={styles.container}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Find Your Perfect Pet Companion ❤️
        </h1>

        <p style={styles.text}>
          Adopt, match, and connect with loving pets near you.
        </p>

        <Link to="/shop" style={styles.button}>
          Explore Pets 🐾
        </Link>
      </div>

      {/* ⭐ CAROUSEL (NEW FEATURE) */}
      <div style={styles.carousel}>

        <button style={{ ...styles.arrow, ...styles.left }} onClick={prev}>
          ❮
        </button>

        <img
          src={pets[index].image}
          alt="carousel pet"
          style={styles.slide}
        />

        <button style={{ ...styles.arrow, ...styles.right }} onClick={next}>
          ❯
        </button>

        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          background: "rgba(0,0,0,0.4)",
          padding: "5px 10px",
          borderRadius: "10px"
        }}>
          {pets[index].name} - {pets[index].type}
        </div>

      </div>

      {/* GRID */}
      <div style={styles.petGrid}>
        {pets.map((pet, index) => (
          <div key={index} style={styles.card}>
            <img src={pet.image} alt={pet.name} style={styles.image} />
            <h3>{pet.name}</h3>
            <p>{pet.type}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;