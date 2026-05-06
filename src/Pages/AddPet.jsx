import React, { useState } from 'react'
import axios from 'axios'

const AddProducts = () => {

  const [product_name, setProduct_name] = useState("")
  const [product_description, setProduct_description] = useState("")
  const [product_cost, setProduct_cost] = useState("")
  const [product_photo, setProduct_photo] = useState("")

  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const submit = async (e) => {

    e.preventDefault()
    setLoading("Please wait")

    try {

      const data = new FormData()
      data.append("product_name", product_name)
      data.append("product_description", product_description)
      data.append("product_cost", product_cost)
      data.append("product_photo", product_photo)

      const response = await axios.post(
        "https://kiruialvin.alwaysdata.net/api/addproducts",
        data
      )

      setLoading("")
      setSuccess(response.data.message)

      setProduct_name("")
      setProduct_description("")
      setProduct_cost("")
      setProduct_photo("")

    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>🛍 Upload Product</h1>
          <p style={styles.subtitle}>Add new items to your store</p>
        </div>

        {/* STATUS */}
        <p style={styles.loading}>{loading}</p>
        <p style={styles.success}>{success}</p>
        <p style={styles.error}>{error}</p>

        <form onSubmit={submit}>

          <input
            type="text"
            placeholder="Enter Product Name"
            style={styles.input}
            value={product_name}
            onChange={(e) => setProduct_name(e.target.value)}
            required
          />

          <textarea
            placeholder="Describe your product"
            style={styles.textarea}
            value={product_description}
            onChange={(e) => setProduct_description(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter product cost"
            style={styles.input}
            value={product_cost}
            onChange={(e) => setProduct_cost(e.target.value)}
            required
          />

          <label style={styles.label}>📸 Upload Product Photo</label>

          <input
            type="file"
            accept="image/*"
            style={styles.file}
            onChange={(e) => setProduct_photo(e.target.files[0])}
            required
          />

          <input
            type="submit"
            value="Upload Product 🚀"
            style={styles.button}
          />

        </form>

      </div>
    </div>
  )
}

export default AddProducts

/* =========================
   PREMIUM UI DESIGN ONLY
========================= */
const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fb, #e3f2fd)",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
  },

  header: {
    textAlign: "center",
    marginBottom: "20px"
  },

  title: {
    margin: 0,
    fontSize: "26px",
    color: "#2c3e50"
  },

  subtitle: {
    fontSize: "14px",
    color: "#777"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px"
  },

  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    minHeight: "80px",
    fontSize: "14px"
  },

  file: {
    marginBottom: "15px"
  },

  label: {
    fontWeight: "bold",
    fontSize: "14px",
    display: "block",
    marginBottom: "8px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s"
  },

  loading: {
    color: "#ff9800",
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
};