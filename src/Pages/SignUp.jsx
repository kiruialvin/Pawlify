import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
 const [showPassword, setShowPassword] = useState(false)
const [strength, setStrength] = useState("")

// ✅ NEW (rules tracking)
const [rules, setRules] = useState({
  length: false,
  number: false,
  special: false
})


  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading("Please wait...")

    try {
      const data = new FormData()

      data.append("username", username)
      data.append("email", email)
      data.append("phone", phone)
      data.append("password", password)

      const response = await axios.post(
        "https://kiruialvin.alwaysdata.net/api/signup",
        data
      )

      setLoading("")
      setSuccess(response.data.message)

      setTimeout(() => {
        navigate("/")
      }, 1000)

      setUsername("")
      setEmail("")
      setPhone("")
      setPassword("")

    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  const checkStrength = (pass) => {
  const newRules = {
    length: pass.length >= 8,
    number: /\d/.test(pass),
    special: /[!@#$%^&*]/.test(pass),
  }

  setRules(newRules)

  const score = Object.values(newRules).filter(Boolean).length

  if (score === 0) return "Very Weak 🔴"
  if (score === 1) return "Weak 🔴"
  if (score === 2) return "Medium 🟠"
  return "Strong 🟢"
}

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.title}>Sign Up 🐾</h1>

        <form onSubmit={submit}>

          <p style={{ color: "orange" }}>{loading}</p>
          <p style={{ color: "green" }}>{success}</p>
          <p style={{ color: "red" }}>{error}</p>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="tel"
            placeholder="Enter your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />

        <div style={{ position: "relative" }}>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) => {
      setPassword(e.target.value)
      setStrength(checkStrength(e.target.value))
    }}
    required
    style={styles.input}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "18px"
    }}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>

</div>
          <div
  style={{
    height: "6px",
    width: "100%",
    background: "#eee",
    borderRadius: "10px",
    marginTop: "5px",
    overflow: "hidden"
  }}
>
  <div
    style={{
      height: "100%",
      width:
        strength.includes("Strong") ? "100%" :
        strength.includes("Medium") ? "60%" :
        strength.includes("Weak") ? "30%" : "10%",
      background:
        strength.includes("Strong") ? "green" :
        strength.includes("Medium") ? "orange" : "red",
      transition: "0.3s"
    }}
  />
</div>

<p style={{ fontSize: "13px", color: "#555" }}>
  {strength}
</p>

          <input
            type="submit"
            value="Sign Up"
            style={styles.button}
          />

          <p style={styles.text}>
            Already have an account?{" "}
            <Link to="/signin" style={styles.link}>
              Sign in
            </Link>
          </p>

        </form>

      </div>
    </div>
  )
}

export default SignUp

// =====================
// INLINE STYLES
// =====================
const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff6b81, #ff8e53)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
    color: "#ff6b81",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#ff6b81",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },

  text: {
    marginTop: "15px",
  },

  link: {
    color: "#ff6b81",
    fontWeight: "bold",
    textDecoration: "none",
  }
}