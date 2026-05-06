import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ ADDED CATEGORY STATE
  const [category, setCategory] = useState("all");

  const petProducts = [
    {
      product_id: "p1",
      product_name: "Dog Toy Bone 🦴",
      product_description: "Durable chew toy for dogs",
      product_cost: 250,
      product_photo: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
      category: "toys"
    },
    {
      product_id: "p2",
      product_name: "Dog Toy Bone 🦴",
      product_description: "Durable chew toy for dogs",
      product_cost: 250,
      product_photo: "https://images.unsplash.com/photo-1708062270853-ee7c66b69f07?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhc2h8ZW58MHx8MHx8fDA%3D",
      category: "toys"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://kiruialvin.alwaysdata.net/api/getproductdetails"
        );

        const apiData = Array.isArray(res.data) ? res.data : [];

        setProducts([
          ...apiData.map(p => ({
            ...p,
            category: p.category || "products"
          })),
          ...petProducts
        ]);

      } catch (err) {
        setProducts(petProducts);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.product_id === product.product_id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));

    alert("Added to cart 🛒");
  };

  // ✅ CATEGORY + SEARCH FILTER
  const filtered = products.filter((p) => {

    const matchesSearch = (p.product_name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || p.category === category;

    return matchesSearch && matchesCategory;
  });

  const getImage = (photo) => {
    if (!photo) return "https://via.placeholder.com/300";
    if (photo.startsWith("http")) return photo;
    return "https://kiruialvin.alwaysdata.net/static/images/" + photo;
  };

  return (
    <div style={styles.page}>

      {/* 🖼️ HERO IMAGE */}
      <div style={styles.hero}>
        <h1 style={styles.heroText}>🐾 Welcome to Pawlify Pet Store</h1>
      </div>

      <h2 style={styles.title}>Available Pets & Products</h2>

      {/* ✅ CATEGORY FILTER (ADDED) */}
      <div style={styles.catBox}>

        <button onClick={() => setCategory("all")} style={styles.catBtn}>
          All
        </button>

        <button onClick={() => setCategory("toys")} style={styles.catBtn}>
          Toys 🦴
        </button>

        <button onClick={() => setCategory("products")} style={styles.catBtn}>
          Products 🛍️
        </button>

      </div>

      {/* SEARCH */}
      <input
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.grid}>

        {filtered.map((p) => (
          <div key={p.product_id} style={styles.card}>

            <img
              src={getImage(p.product_photo)}
              style={styles.img}
              alt=""
            />

            <h3>{p.product_name}</h3>
            <p>{p.product_description}</p>
            <b>Ksh {p.product_cost}</b>

            <button
              style={styles.btn}
              onClick={() => addToCart(p)}
            >
              Add to Cart 🛒
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

/* =========================
   STYLES (ONLY ADDED CATEGORY STYLES)
========================= */
const styles = {

  page: {
    padding: "20px",
    background: "#f5f7fb",
    minHeight: "100vh"
  },

  hero: {
    height: "200px",
    borderRadius: "15px",
    marginBottom: "20px",
    backgroundImage: "url('https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textShadow: "0 2px 10px rgba(0,0,0,0.7)"
  },

  heroText: {
    fontSize: "28px",
    textAlign: "center"
  },

  title: {
    textAlign: "center"
  },

  search: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "300px",
    borderRadius: "10px",
    border: "1px solid #ccc"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  img: {
    width: "100%",
    height: "170px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  btn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "10px"
  },

  // ✅ CATEGORY UI
  catBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px"
  },

  catBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    background: "#2c3e50",
    color: "white",
    cursor: "pointer"
  }
};