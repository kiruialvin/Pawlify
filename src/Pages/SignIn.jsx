import { Link } from "react-router-dom";

function SignIn() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)"
    },

    box: {
      padding: "35px",
      borderRadius: "20px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
      width: "320px",
      background: "white",
      textAlign: "center"
    },

    title: {
      marginBottom: "10px"
    },

    subtitle: {
      color: "gray",
      fontSize: "14px",
      marginBottom: "20px"
    },

    input: {
      width: "100%",
      margin: "10px 0",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      outline: "none"
    },

    button: {
      width: "100%",
      padding: "12px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      marginTop: "10px"
    },

    link: {
      marginTop: "15px",
      display: "block",
      fontSize: "14px",
      color: "#2563eb",
      textDecoration: "none"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        {/* 🐶 Branding */}
        <h1 style={styles.title}>🐾 Pawlify</h1>
        <p style={styles.subtitle}>
          Welcome back! Sign in to adopt your next pet ❤️
        </p>

        {/* Inputs */}
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />

        {/* Button */}
        <button style={styles.button}>
          Login
        </button>

        {/* 🔗 Link to SignUp */}
        <Link to="/signup" style={styles.link}>
          Don’t have an account? Sign Up
        </Link>

      </div>
    </div>
  );
}

export default SignIn;