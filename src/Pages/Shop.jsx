import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Shop({ pets = [], addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  const navigate = useNavigate();

  const safePets = Array.isArray(pets) ? pets : [];

  // 🧠 FILTER BY CATEGORY
  const filteredPets =
    selectedCategory === "All"
      ? safePets
      : safePets.filter((pet) => pet.category === selectedCategory);

  // 📦 PAGINATION (LOAD MORE)
  const visiblePets = filteredPets.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // 👀 VIEW DETAILS
  const viewDetails = (pet) => {
    navigate(`/pet/${pet.id}`, { state: pet });
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>🐾 Pawlify Pet Store</h2>

      {/* 🐶 CATEGORY FILTER */}
      <div style={styles.categories}>
        {["All", "Dogs", "Cats", "Birds", "Others"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(4); // reset pagination when category changes
            }}
            style={{
              ...styles.catBtn,
              background: selectedCategory === cat ? "#2563eb" : "#eee",
              color: selectedCategory === cat ? "white" : "black"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🐾 PET GRID */}
      {filteredPets.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No pets found 🐾</h3>
      ) : (
        <>
          <div style={styles.grid}>
            {visiblePets.map((pet) => (
              <div key={pet.id} style={styles.card}>

                <img
                  src={pet.images?.[0] || pet.image}
                  alt={pet.name}
                  style={styles.img}
                />

                <h3>{pet.name}</h3>
                <p>{pet.type}</p>
                <p>{pet.category}</p>
                <p>${pet.price}</p>

                <button
                  style={styles.btn}
                  onClick={() => addToCart(pet)}
                >
                  Add to Cart 🛒
                </button>

                <button
                  style={styles.detailsBtn}
                  onClick={() => viewDetails(pet)}
                >
                  View Details 👀
                </button>

              </div>
            ))}
          </div>

          {/* 📦 LOAD MORE BUTTON */}
          {visibleCount < filteredPets.length && (
            <div style={styles.loadMore}>
              <button onClick={loadMore} style={styles.loadBtn}>
                Load More Pets ⬇️
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
}

const styles = {
  container: {
    padding: "30px"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },

  // CATEGORY
  categories: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px"
  },
  catBtn: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer"
  },

  // GRID
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  img: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  btn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  detailsBtn: {
    marginTop: "8px",
    padding: "10px",
    width: "100%",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  loadMore: {
    textAlign: "center",
    marginTop: "20px"
  },

  loadBtn: {
    padding: "12px 20px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

export default Shop;