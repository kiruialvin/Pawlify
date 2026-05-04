import { useState } from "react";

function AddPet({ onAddPet = () => {} }) {
  const [loading, setLoading] = useState(false);

  const [pet, setPet] = useState({
    name: "",
    type: "",
    category: "Dogs",
    price: "",
    image: ""
  });

  const categories = ["Dogs", "Cats", "Birds", "Others"];

  // 🧠 HANDLE INPUT
  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  // 🐾 SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pet.name || !pet.type || !pet.price || !pet.image) {
      alert("⚠️ Please fill all fields");
      return;
    }

    setLoading(true);

    const newPet = {
      id: Date.now(),
      name: pet.name,
      type: pet.type,
      category: pet.category,
      price: Number(pet.price),
      images: [pet.image]
    };

    setTimeout(() => {
      onAddPet(newPet);

      setPet({
        name: "",
        type: "",
        category: "Dogs",
        price: "",
        image: ""
      });

      setLoading(false);
    }, 500);
  };

  return (
    <div style={styles.page}>

      <form onSubmit={handleSubmit} style={styles.card}>

        <h2>🐾 Admin Add Pet</h2>

        <input
          name="name"
          value={pet.name}
          onChange={handleChange}
          placeholder="Pet Name"
          style={styles.input}
        />

        <input
          name="type"
          value={pet.type}
          onChange={handleChange}
          placeholder="Breed / Type"
          style={styles.input}
        />

        <select
          name="category"
          value={pet.category}
          onChange={handleChange}
          style={styles.input}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          name="price"
          type="number"
          value={pet.price}
          onChange={handleChange}
          placeholder="Price"
          style={styles.input}
        />

        <input
          name="image"
          value={pet.image}
          onChange={handleChange}
          placeholder="Image URL"
          style={styles.input}
        />

        {/* PREVIEW */}
        {pet.image && (
          <img
            src={pet.image}
            alt="preview"
            style={styles.preview}
          />
        )}

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Pet 🐾"}
        </button>

      </form>

    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    background: "#f9fafb"
  },
  card: {
    width: "380px",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    background: "#fff",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
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
    fontWeight: "bold",
    marginTop: "10px"
  },
  preview: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    marginTop: "10px"
  }
};

export default AddPet;