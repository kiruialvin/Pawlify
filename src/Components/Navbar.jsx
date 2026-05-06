import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 SEARCH STATES
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // ================= CART =================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);

    const update = () => {
      const updated = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updated);
    };

    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const cartCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  // ================= LOAD PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://kiruialvin.alwaysdata.net/api/getproductdetails"
      );
      const data = await res.json();
      setProducts(data || []);
    };

    fetchProducts();
  }, []);

  // ================= LIVE SEARCH =================
  const handleLiveSearch = (text) => {
    setSearch(text);

    if (!text.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter((p) =>
      p.product_name?.toLowerCase().includes(text.toLowerCase())
    );

    setResults(filtered.slice(0, 6));
    setShowResults(true);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const close = () => {
      setShowResults(false);
      setPreview(null);
    };

    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "Cart 🛒" },
    { path: "/signin", label: "Sign In" },
    { path: "/signup", label: "Sign Up" },
    { path: "/add-pet", label: "Add Pet 🐶" }
  ];

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 22px",
      position: "sticky",
      top: 0,
      zIndex: 9999,
      background: darkMode ? "#0f0f0f" : "#fff",
      color: darkMode ? "white" : "black",
      borderBottom: "1px solid #eee",
    },

    logo: {
      fontSize: "22px",
      fontWeight: "bold",
    },

    searchBox: {
      padding: "8px 12px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      width: "220px",
      outline: "none",
    },

    menu: {
      display: "flex",
      gap: "18px",
      alignItems: "center",
    },

    link: {
      textDecoration: "none",
      color: "inherit",
      fontWeight: "500",
    },

    cartBadge: {
      background: "red",
      color: "white",
      borderRadius: "50%",
      padding: "2px 7px",
      fontSize: "12px",
      marginLeft: "5px",
    },

    dropdown: {
      position: "absolute",
      top: "55px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "300px",
      background: darkMode ? "#222" : "white",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      zIndex: 99999,
    },

    item: {
      padding: "10px",
      cursor: "pointer",
      borderBottom: "1px solid #eee",
    },

    preview: {
      position: "absolute",
      top: "55px",
      right: "-310px",
      width: "280px",
      background: darkMode ? "#222" : "white",
      color: darkMode ? "white" : "black",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      padding: "12px",
      zIndex: 999999,
    },

    previewImg: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "10px",
    },

    hamburger: {
      fontSize: "28px",
      cursor: "pointer",
      display: "none",
    },
  };

  return (
    <div style={styles.nav}>

      {/* LOGO */}
      <div style={styles.logo}>🐾 PetMatch</div>

      {/* SEARCH */}
      <div style={{ position: "relative" }}>

        <input
          style={styles.searchBox}
          placeholder="Search pets..."
          value={search}
          onChange={(e) => handleLiveSearch(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />

        {/* 🔥 SEARCH DROPDOWN */}
        {showResults && results.length > 0 && (
          <div style={styles.dropdown}>
            {results.map((item) => (
              <div
                key={item.product_id}
                style={styles.item}
                onMouseEnter={() => setPreview(item)}
                onMouseLeave={() => setPreview(null)}
                onClick={() => {
                  setSearch("");
                  setShowResults(false);

                  navigate("/products", {
                    state: { selectedProductId: item.product_id }
                  });
                }}
              >
                🐶 {item.product_name}
              </div>
            ))}
          </div>
        )}

        {/* 🔥 PREVIEW CARD */}
        {preview && (
          <div style={styles.preview}>
            <img
              src={
                preview.product_photo?.startsWith("http")
                  ? preview.product_photo
                  : "https://kiruialvin.alwaysdata.net/static/images/" +
                    preview.product_photo
              }
              style={styles.previewImg}
            />

            <h4>{preview.product_name}</h4>

            <p style={{ fontSize: "12px", opacity: 0.8 }}>
              {preview.product_description?.slice(0, 80)}...
            </p>

            <b style={{ color: "#2563eb" }}>
              Ksh {preview.product_cost}
            </b>
          </div>
        )}

      </div>

      {/* MENU */}
      <div className="desktop" style={styles.menu}>
        {links.map((l, i) => {
          const active = location.pathname === l.path;

          return (
            <Link key={i} to={l.path} style={styles.link}>
              {l.label}
              {l.path === "/cart" && (
                <span style={styles.cartBadge}>
                  {cartCount}
                </span>
              )}
            </Link>
          );
        })}

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* HAMBURGER */}
      <div className="hamburger" style={styles.hamburger}>
        ☰
      </div>

      {/* RESPONSIVE */}
      <style>
        {`
          .desktop { display: flex; }

          @media (max-width: 768px) {
            .desktop { display: none !important; }
            .hamburger { display: block !important; }
          }

          .hamburger { display: none; }
        `}
      </style>

    </div>
  );
}

export default Navbar;