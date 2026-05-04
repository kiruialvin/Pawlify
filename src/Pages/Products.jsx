import { useState } from "react";

function Products({ addToCart }) {
  const [hovered, setHovered] = useState(null);

  const products = [
  {
    id: 101,
    name: "Dog Toy 🦴",
    type: "Toy",
    price: 20,
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
  },
  {
    id: 102,
    name: "Cat Food 🐟",
    type: "Food",
    price: 15,
    image: "https://images.unsplash.com/photo-1601758064224-2f47d5c6b3c5"
  }
];

  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      padding: "40px"
    },
    card: (i) => ({
      padding: "15px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transform: hovered === i ? "scale(1.05)" : "scale(1)",
      transition: "0.3s"
    }),
    img: {
      width: "100%",
      borderRadius: "15px"
    },
    btn: {
      marginTop: "10px",
      padding: "10px",
      background: "green",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.grid}>
      {products.map((item, i) => (
        <div
          key={item.id}
          style={styles.card(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={item.image} style={styles.img} />
          <h2>{item.name}</h2>
          <p>{item.type}</p>
          

          <button style={styles.btn} onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;