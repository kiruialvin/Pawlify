import { Link } from "react-router-dom";

function Home() {
  // 🐶 Sample pets data
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
    }
  ];

  // 🎨 Styles
  const styles = {
    container: {
      textAlign: "center",
      padding: "60px 20px",
      background: "#f9f9f9",
      minHeight: "100vh"
    },
    title: {
      fontSize: "42px",
      marginBottom: "10px"
    },
    text: {
      color: "gray",
      marginBottom: "20px"
    },
    button: {
      background: "#2563eb",
      color: "white",
      padding: "12px 25px",
      borderRadius: "12px",
      textDecoration: "none",
      display: "inline-block"
    },

    // 🐶 PET SECTION
    petGrid: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "50px",
      flexWrap: "wrap"
    },
    card: {
      width: "220px",
      padding: "15px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      background: "white",
      transition: "0.3s"
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "10px"
    }
  };

  return (
    <div style={styles.container}>
      {/* 🐾 HERO TEXT */}
      <h1 style={styles.title}>
        Find Your Perfect Pet Companion ❤️
      </h1>

      <p style={styles.text}>
        Swipe, match, and adopt your new best friend
      </p>

      <Link to="/shop" style={styles.button}>
        Explore Pets
      </Link>

      {/* 🐶 FEATURED PETS */}
      <div style={styles.petGrid}>
        {pets.map((pet, index) => (
          <div key={index} style={styles.card}>
            <img
              src={pet.image}
              alt={pet.name}
              style={styles.image}
            />
            <h3>{pet.name}</h3>
            <p style={{ color: "gray" }}>{pet.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;