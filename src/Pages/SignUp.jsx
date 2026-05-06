import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h2>{isLogin ? "Welcome Back 👋" : "Create Account 🐾"}</h2>

        {!isLogin && <input placeholder="Name" style={styles.input} />}

        <input placeholder="Email" style={styles.input} />
        <input placeholder="Password" type="password" style={styles.input} />

        <button style={styles.btn}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={styles.switch}
        >
          {isLogin
            ? "No account? Sign up"
            : "Already have account? Login"}
        </p>

      </div>

    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#e0f2ff,#f8fbff)"
  },

  card: {
    width: "320px",
    padding: "25px",
    background: "white",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  btn: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px"
  },

  switch: {
    marginTop: "10px",
    color: "#2563eb",
    cursor: "pointer"
  }
};