import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProducts = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // cart qty (add to cart)
  const [quantities, setQuantities] = useState({});

  // BUY NOW MODAL
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyQty, setBuyQty] = useState(1);

  const img_url =
    "https://kiruialvin.alwaysdata.net/static/images/";

  // ================= FETCH =================
  const fetchProducts = async () => {
    setLoading("Loading products...");

    try {
      const response = await axios.get(
        "https://kiruialvin.alwaysdata.net/api/getproductdetails"
      );

      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setError(error.message);
      setLoading("");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ================= FILTER =================
  const filteredProducts = products.filter((p) =>
    (p.product_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // ================= CART =================
  const addtocart = (product) => {
    const qty = quantities[product.product_id] || 1;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item.product_id === product.product_id
    );

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added ${qty} item(s) 🛒`);
  };

  // ================= BUY NOW MODAL =================
  const openBuyModal = (product) => {
    setSelectedProduct(product);
    setBuyQty(1);
    setShowBuyModal(true);
  };

  const increaseBuyQty = () => setBuyQty((q) => q + 1);

  const decreaseBuyQty = () =>
    setBuyQty((q) => Math.max(1, q - 1));

  const proceedToPayment = () => {
    navigate("/MpesaPayment", {
      state: {
        product: selectedProduct,
        quantity: buyQty,
        total: selectedProduct.product_cost * buyQty,
      },
    });

    setShowBuyModal(false);
  };

  // ================= QTY FOR CART =================
  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  // ================= UI =================
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🐾 Available Products</h1>

      <input
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p style={{ color: "orange" }}>{loading}</p>
      <p style={{ color: "red" }}>{error}</p>

      {/* GRID */}
      <div style={styles.grid}>
        {currentProducts.map((product) => (
          <div key={product.product_id} style={styles.card}>
            <img
              src={img_url + product.product_photo}
              style={styles.img}
            />

            <div style={styles.body}>
              <h3>{product.product_name}</h3>
              <p>{product.product_description}</p>
              <b>Ksh {product.product_cost}</b>

              {/* CART QTY */}
              <div style={styles.qtyBox}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => decreaseQty(product.product_id)}
                >
                  -
                </button>

                <span>
                  {quantities[product.product_id] || 1}
                </span>

                <button
                  style={styles.qtyBtn}
                  onClick={() => increaseQty(product.product_id)}
                >
                  +
                </button>
              </div>

              <button
                style={styles.cartBtn}
                onClick={() => addtocart(product)}
              >
                Add to Cart 🛒
              </button>

              <button
                style={styles.buyBtn}
                onClick={() => openBuyModal(product)}
              >
                Buy Now 💳
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div style={styles.pagination}>
        <button
          style={styles.pageBtn}
          onClick={() =>
            setCurrentPage((p) => Math.max(p - 1, 1))
          }
        >
          Prev
        </button>

        <span>
          {currentPage} / {totalPages || 1}
        </span>

        <button
          style={styles.pageBtn}
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(p + 1, totalPages)
            )
          }
        >
          Next
        </button>
      </div>

      {/* ================= BUY NOW MODAL ================= */}
      {showBuyModal && selectedProduct && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>🛒 Buy Now</h2>

            <img
              src={img_url + selectedProduct.product_photo}
              style={styles.modalImg}
            />

            <h3>{selectedProduct.product_name}</h3>
            <p>Ksh {selectedProduct.product_cost}</p>

            {/* QTY */}
            <div style={styles.qtyBox}>
              <button
                style={styles.qtyBtn}
                onClick={decreaseBuyQty}
              >
                -
              </button>

              <span>{buyQty}</span>

              <button
                style={styles.qtyBtn}
                onClick={increaseBuyQty}
              >
                +
              </button>
            </div>

            <h3>
              Total: Ksh{" "}
              {selectedProduct.product_cost * buyQty}
            </h3>

            <div style={styles.modalBtns}>
              <button
                style={styles.confirmBtn}
                onClick={proceedToPayment}
              >
                Pay Now 💳
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => setShowBuyModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetProducts;

// ================= STYLES =================
const styles = {
  page: { padding: "20px", background: "#f5f7fb" },

  title: { textAlign: "center" },

  search: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "300px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    textAlign: "center",
  },

  img: { width: "100%", height: "180px", objectFit: "cover" },

  body: { padding: "10px" },

  qtyBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "10px 0",
  },

  qtyBtn: {
    padding: "5px 10px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },

  cartBtn: {
    width: "100%",
    padding: "8px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    marginTop: "5px",
  },

  buyBtn: {
    width: "100%",
    padding: "8px",
    background: "#3498db",
    color: "white",
    border: "none",
    marginTop: "5px",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    gap: "10px",
  },

  pageBtn: {
    padding: "8px 12px",
    background: "#2c3e50",
    color: "white",
    border: "none",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
  },

  modalImg: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },

  modalBtns: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  confirmBtn: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
  },

  cancelBtn: {
    padding: "10px",
    background: "red",
    color: "white",
    border: "none",
  },
};