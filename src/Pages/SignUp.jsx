import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔐 Password strength logic
  const getStrength = (pass) => {
    let strength = 0;

    if (pass.length >= 6) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    return strength;
  };

  const strength = getStrength(password);

  const strengthLabel = ["Too Weak", "Weak", "Good", "Strong", "Very Strong"];
  const strengthColor = ["red", "orange", "gold", "green", "darkgreen"];

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
      background: "#16a34a",
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

        {/* 🐾 Title */}
        <h1>🐾 Pawlify</h1>
        <p style={{ color: "gray", fontSize: "14px" }}>
          Create your account to adopt pets ❤️
        </p>

        {/* Name */}
        <input type="text" placeholder="Full Name" style={styles.input} />

        {/* Email */}
        <input type="email" placeholder="Email" style={styles.input} />

        {/* 🔐 Password with toggle */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...styles.input,
              paddingRight: "40px"
            }}
          />

          {/* 👁️ Toggle */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* 🔐 Strength meter */}
        {password && (
          <div style={{ textAlign: "left" }}>
            {/* Bar */}
            <div
              style={{
                height: "6px",
                borderRadius: "5px",
                background: "#eee",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${(strength / 4) * 100}%`,
                  height: "100%",
                  background: strengthColor[strength],
                  transition: "0.3s"
                }}
              />
            </div>

            {/* Label */}
            <p
              style={{
                fontSize: "12px",
                color: strengthColor[strength],
                marginTop: "5px"
              }}
            >
              {strengthLabel[strength]}
            </p>
          </div>
        )}

        {/* Submit */}
        <button style={styles.button}>
          Sign Up
        </button>

        {/* Link */}
        <Link to="/signin" style={styles.link}>
          Already have an account? Sign In
        </Link>

      </div>
    </div>
  );
}

export default SignUp;