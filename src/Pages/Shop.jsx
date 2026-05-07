import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // ✅ PAGINATION ADDED
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const petProducts = [
    {
      product_id: "p1",
      product_name: "Dog Toy Bone 🦴",
      product_description: "Durable chew toy for dogs",
      product_cost: 250,
      product_photo: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwdG95fGVufDB8fDB8fHww",
      category: "toys"
    },
    {
      product_id: "p2",
      product_name: "leash",
      product_description: "Durable chew toy for dogs",
      product_cost: 250,
      product_photo: "https://images.unsplash.com/photo-1708062270853-ee7c66b69f07?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhc2h8ZW58MHx8MHx8fDA%3D",
      category: "toys"
    },
    {
      product_id: "p3",
      product_name: "bowl",
      product_description: "Durable chew toy for dogs",
      product_cost: 250,
      product_photo: "https://images.unsplash.com/photo-1565204333704-e2618a0a6938?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvZyUyMGJvd2x8ZW58MHx8MHx8fDA%3D"
    },
    {
      product_id: "p4",
      product_name: "collar",
      product_description: "Durable chew toy for dogs",
      product_cost: 250,
      product_photo: "https://plus.unsplash.com/premium_photo-1692392181661-96c4b34759db?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nJTIwY29sbGFyfGVufDB8fDB8fHww"
    },
    {
  product_id: "p5",
  product_name: "Dog Bed 🛏️",
  product_description: "Soft and comfortable sleeping bed for dogs",
  product_cost: 2500,
  product_photo: "https://images.unsplash.com/photo-1520721973443-8f2bfd949b19?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRvZyUyMGJlZHxlbnwwfHwwfHx8MA%3D%3D",
  category: "products"
},
{
  product_id: "p6",
  product_name: "Dog Treats 🍖",
  product_description: "Healthy and tasty snacks for your dog",
  product_cost: 500,
  product_photo: "https://images.unsplash.com/photo-1604544203292-0daa7f847478?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZyUyMHRyZWF0c3xlbnwwfHwwfHx8MA%3D%3D",
  category: "products"
},
{
  product_id: "p7",
  product_name: "Dog Shampoo 🧴",
  product_description: "Gentle shampoo for clean and fresh fur",
  product_cost: 800,
  product_photo: "https://images.unsplash.com/photo-1774548814874-463aa2c0eddf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNoYW1wb28lMjBmb3IlMjBkb2dzfGVufDB8fDB8fHww",
  category: "products"
},
{
  product_id: "p8",
  product_name: "Dog Food 🥩",
  product_description: "Nutritious dry food for all dog breeds",
  product_cost: 3200,
  product_photo: "https://images.unsplash.com/photo-1684882726821-2999db517441?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwZm9vZCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
  category: "products"
},
{
  product_id: "p9",
  product_name: "Dog Harness 🦺",
  product_description: "Comfortable harness for walking your dog",
  product_cost: 1200,
  product_photo: "https://images.unsplash.com/photo-1580129518790-0482fc5eed65?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwaGFybmVzc3xlbnwwfHwwfHx8MA%3D%3D",
  category: "products"
},
{
  product_id: "p10",
  product_name: "Dog Brush 🪮",
  product_description: "Grooming brush to remove loose fur",
  product_cost: 600,
  product_photo: "https://images.unsplash.com/photo-1635094420131-0337a3e732fc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nJTIwYnJ1c2h8ZW58MHx8MHx8fDA%3D",
  category: "products"
},
{
  product_id: "p11",
  product_name: "Dog Crate 🏠",
  product_description: "Safe and secure crate for your dog",
  product_cost: 4500,
  product_photo: "https://images.unsplash.com/photo-1749703174207-257698ceb352?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZyUyMGNyYXRlfGVufDB8fDB8fHww",
  category: "products"
},
{
  product_id: "p12",
  product_name: "Training Pads 🧻",
  product_description: "Absorbent pads for puppy training",
  product_cost: 900,
  product_photo: "https://images.unsplash.com/photo-1620021029770-6fd5abff5197?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYWluaW5nJTIwcGFkcyUyMGZvciUyMGRvZ3N8ZW58MHx8MHx8fDA%3D",
  category: "products"
},
{
  product_id: "p13",
  product_name: "Dog Ball 🎾",
  product_description: "Fun bouncing ball for playtime",
  product_cost: 300,
  product_photo: "https://images.unsplash.com/photo-1612502169027-5a379283f9c0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwYmFsbHxlbnwwfHwwfHx8MA%3D%3D",
  category: "toys"
},
{
  product_id: "p14",
  product_name: "Rope Toy 🪢",
  product_description: "Strong rope toy for tug-of-war",
  product_cost: 350,
  product_photo: "https://images.unsplash.com/photo-1615260558044-4c75855fa4d1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nJTIwcm9wZXxlbnwwfHwwfHx8MA%3D%3D",
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

  // ✅ RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

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

  // ✅ FILTER
  const filtered = products.filter((p) => {

    const matchesSearch = (p.product_name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || p.category === category;

    return matchesSearch && matchesCategory;
  });

  // ✅ PAGINATION LOGIC
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const getImage = (photo) => {
    if (!photo) return "https://via.placeholder.com/300";
    if (photo.startsWith("http")) return photo;
    return "https://kiruialvin.alwaysdata.net/static/images/" + photo;
  };

  return (
    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroText}>🐾 Welcome to Pawlify Pet Store</h1>
      </div>

      <h2 style={styles.title}>Available Pets & Products</h2>

      {/* CATEGORY */}
      <div style={styles.catBox}>
        <button onClick={() => setCategory("all")} style={styles.catBtn}>All</button>
        <button onClick={() => setCategory("toys")} style={styles.catBtn}>Toys 🦴</button>
        <button onClick={() => setCategory("products")} style={styles.catBtn}>Products 🛍️</button>
      </div>

      {/* SEARCH */}
      <input
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID */}
      <div style={styles.grid}>

        {currentProducts.map((p) => (
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

      {/* ✅ PAGINATION UI */}
      <div style={styles.pagination}>

        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          style={styles.pageBtn}
        >
          ⬅ Prev
        </button>

        <span>
          Page {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          style={styles.pageBtn}
        >
          Next ➡
        </button>

      </div>

    </div>
  );
}

/* =========================
   STYLES (ADDED PAGINATION ONLY)
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },

  heroText: { fontSize: "28px" },

  title: { textAlign: "center" },

  search: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "300px"
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
    textAlign: "center"
  },

  img: {
    width: "100%",
    height: "170px",
    objectFit: "cover"
  },

  btn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "green",
    color: "white",
    border: "none"
  },

  catBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },

  catBtn: {
    padding: "8px 12px",
    border: "none",
    background: "#2c3e50",
    color: "white",
    cursor: "pointer"
  },

  // ✅ PAGINATION ADDED
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    gap: "10px"
  },

  pageBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    background: "#2c3e50",
    color: "white",
    cursor: "pointer"
  }
};