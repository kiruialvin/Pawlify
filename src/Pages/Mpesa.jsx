import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const MpesaPayment = () => {

  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [phone, setPhone] = useState("")

  const location = useLocation();
const product = location.state?.product;

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const total = product
  ? product.product_cost
  : cart.reduce((sum, item) => sum + (item.product_cost || 0) * item.quantity, 0);

  const submit = async (e) => {
  e.preventDefault();

  if (!phone) {
    setError("Enter phone number");
    return;
  }

  setError("");
  setSuccess("");
  setLoading("Processing payment...");

  try {
    const data = new FormData();
    data.append("phone", phone);
    data.append("amount", total);

    const res = await axios.post(
      "https://kiruialvin.alwaysdata.net/api/mpesa_payment",
      data
    );

    setLoading("");
    setSuccess("📲 STK sent. Complete payment on your phone");

    // ✅ CLEAR CART AFTER PAYMENT REQUEST
    localStorage.removeItem("cart");

  } catch (err) {
    setLoading("");
    setError("Payment failed");
  }
};

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>💳 Lipa na M-Pesa Checkout</h1>

      {/* PRODUCT SUMMARY CARD */}
      <div style={styles.productCard}>
        {product ? (
  <>
    <h2>{product.product_name}</h2>
    <p>{product.product_description}</p>
    <h3>Ksh {product.product_cost}</h3>
  </>
) : (
  <>
    <h2>🛒 Cart Checkout</h2>
    <h3>Ksh {total}</h3>
  </>
)}
      </div>

      {/* PAYMENT CARD */}
      <div style={styles.card}>

        <form onSubmit={submit}>

          <p style={styles.loading}>{loading}</p>
          <p style={styles.success}>{success}</p>
          <p style={styles.error}>{error}</p>

          <input
            type="tel"
            placeholder="Enter phone number (254...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button}>
            💰 Make Payment
          </button>

        </form>

      </div>

    </div>
  )
}

export default MpesaPayment

/* =========================
   MODERN STYLES ONLY
========================= */
const styles = {

  page: {
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #e0f7fa, #fce4ec)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#2c3e50"
  },

  productCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },

  price: {
    color: "green"
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #00c853, #64dd17)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px"
  },

  loading: {
    color: "orange",
    textAlign: "center"
  },

  success: {
    color: "green",
    textAlign: "center"
  },

  error: {
    color: "red",
    textAlign: "center"
  }
}