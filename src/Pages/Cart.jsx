import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // ================= LOAD CART =================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));

    if (Array.isArray(data)) {
      setCart(data);
    } else {
      setCart([]);
    }
  }, []);

  // ================= REMOVE ITEM =================
  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ================= CLEAR CART =================
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  // ================= TOTAL (FIXED WITH QUANTITY) =================
  const total = cart.reduce((sum, item) => {
    const price = Number(item.product_cost || 0);
    const qty = Number(item.quantity || 1);
    return sum + price * qty;
  }, 0);

  // ================= CHECKOUT =================
  const checkout = () => {
    if (!Array.isArray(cart) || cart.length === 0) return;

    navigate("/MpesaPayment", {
      state: { cart, total },
    });

    setShowModal(false);
  };

  // ================= STYLES =================
  const styles = {
    page: {
      padding: "20px",
      fontFamily: "Arial",
      background: "#f5f5f5",
      minHeight: "100vh",
    },

    title: {
      textAlign: "center",
      marginBottom: "20px",
    },

    grid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
    },

    card: {
      width: "250px",
      background: "white",
      borderRadius: "12px",
      padding: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
    },

    img: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "10px",
    },

    removeBtn: {
      marginTop: "10px",
      padding: "8px",
      background: "#e53935",
      color: "white",
      border: "none",
      borderRadius: "6px",
    },

    clearBtn: {
      display: "block",
      margin: "10px auto",
      padding: "10px",
      background: "#444",
      color: "white",
      border: "none",
      borderRadius: "8px",
    },

    checkoutBtn: {
      display: "block",
      margin: "10px auto",
      padding: "12px",
      background: "#2e7d32",
      color: "white",
      border: "none",
      borderRadius: "8px",
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

    modalItem: {
      borderBottom: "1px solid #ddd",
      padding: "5px 0",
      textAlign: "left",
    },

    modalBtns: {
      marginTop: "15px",
      display: "flex",
      justifyContent: "space-between",
    },

    confirmBtn: {
      padding: "10px",
      background: "#2e7d32",
      color: "white",
      border: "none",
      borderRadius: "6px",
    },

    cancelBtn: {
      padding: "10px",
      background: "#e53935",
      color: "white",
      border: "none",
      borderRadius: "6px",
    },
  };

  // ================= UI =================
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 My Cart</h1>

      {cart.length === 0 && (
        <p style={{ textAlign: "center" }}>Cart is empty</p>
      )}

      {cart.length > 0 && (
        <button
          style={styles.checkoutBtn}
          onClick={() => setShowModal(true)}
        >
          💳 MPESA Checkout
        </button>
      )}

      <button style={styles.clearBtn} onClick={clearCart}>
        Clear Cart
      </button>

      {/* ================= CART ITEMS ================= */}
      <div style={styles.grid}>
        {cart.map((item, i) => {
          const qty = item.quantity || 1;
          const subtotal = (item.product_cost || 0) * qty;

          return (
            <div key={i} style={styles.card}>
              <img
                src={
                  item.product_photo?.startsWith("http")
                    ? item.product_photo
                    : "https://kiruialvin.alwaysdata.net/static/images/" +
                      item.product_photo
                }
                style={styles.img}
              />

              <h3>{item.product_name}</h3>
              <p>{item.product_description}</p>

              {/* ✅ QUANTITY */}
              <p>
                Quantity: <b>{qty}</b>
              </p>

              {/* ✅ SUBTOTAL */}
              <b>Subtotal: Ksh {subtotal}</b>

              <br />

              <button
                style={styles.removeBtn}
                onClick={() => removeItem(i)}
              >
                ❌ Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>🧾 Order Summary</h2>

            {cart.map((item, i) => {
              const qty = item.quantity || 1;
              const subtotal =
                (item.product_cost || 0) * qty;

              return (
                <div key={i} style={styles.modalItem}>
                  <p>
                    {item.product_name} × {qty} ={" "}
                    <b>Ksh {subtotal}</b>
                  </p>
                </div>
              );
            })}

            <h3>Total: Ksh {total}</h3>

            <div style={styles.modalBtns}>
              <button
                style={styles.confirmBtn}
                onClick={checkout}
              >
                Confirm MPESA 💳
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}