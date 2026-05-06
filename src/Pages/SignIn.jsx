import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState("")

  const navigate = useNavigate()

  // 🔐 password strength (same logic idea as signup)
  const checkStrength = (pass) => {
    if (pass.length < 4) return "Weak 🔴"
    if (pass.length < 8) return "Medium 🟠"
    return "Strong 🟢"
  }

  const submit = async (e) => {
    e.preventDefault()

    setLoading("Please wait...")
    setError("")
    setSuccess("")

    try {
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)

      const response = await axios.post(
        "https://kiruialvin.alwaysdata.net/api/signin",
        data
      )

      setLoading("")

      if (response.data.user) {

        localStorage.setItem("user", JSON.stringify(response.data.user))

        setSuccess(response.data.message)

        setTimeout(() => {
          navigate("/")
        }, 1000)

      } else {
        setError(response.data.message)
      }

      setEmail("")
      setPassword("")
      setStrength("")

    } catch (err) {
      setLoading("")
      setError(err?.response?.data?.message || err.message)
    }
  }

  // 🎨 INLINE STYLES
  const page = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #dbeafe, #fce7f3)"
  }

  const card = {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
  }

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  }

  const button = {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #2563eb, #06b6d4)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }

  const passwordBox = {
    position: "relative"
  }

  const eye = {
    position: "absolute",
    right: "12px",
    top: "12px",
    cursor: "pointer"
  }

  const strengthStyle = {
    fontSize: "13px",
    marginBottom: "10px",
    color: "#555"
  }

  return (
    <div style={page}>

      <div style={card}>

        <h2 style={{ textAlign: "center" }}>🔐 Sign In</h2>

        <form onSubmit={submit}>

          <p style={{ color: "orange", textAlign: "center" }}>{loading}</p>
          <p style={{ color: "green", textAlign: "center" }}>{success}</p>
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>

          <input
            style={input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <div style={passwordBox}>

            <input
              style={input}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setStrength(checkStrength(e.target.value))
              }}
              required
            />

            <span
              style={eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>

          </div>

          <p style={strengthStyle}>{strength}</p>

          <button style={button}>
            Sign In
          </button>

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

        </form>

      </div>

    </div>
  )
}

export default SignIn