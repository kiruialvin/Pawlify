import { useState } from "react";

function AdminDashboard({ pets, deletePet, updatePet }) {
  const [editingPet, setEditingPet] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    price: "",
    image: ""
  });

  // 🧠 start edit
  const handleEdit = (pet) => {
    setEditingPet(pet.id);
    setForm(pet);
  };

  // 🧠 update form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧠 save update
  const handleUpdate = () => {
    updatePet({
      ...form,
      price: Number(form.price)
    });

    setEditingPet(null);
  };

  return (
    <div style={styles.container}>
      <h1>🐾 Admin Dashboard</h1>

      {/* PET LIST */}
      <div style={styles.grid}>
        {pets.map((pet) => (
          <div key={pet.id} style={styles.card}>

            <img src={pet.image} style={styles.img} />

            {editingPet === pet.id ? (
              <>
                <input name="name" value={form.name} onChange={handleChange} />
                <input name="type" value={form.type} onChange={handleChange} />
                <input name="price" value={form.price} onChange={handleChange} />
                <input name="category" value={form.category} onChange={handleChange} />

                <button onClick={handleUpdate} style={styles.saveBtn}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{pet.name}</h3>
                <p>{pet.type}</p>
                <p>${pet.price}</p>

                <button onClick={() => handleEdit(pet)} style={styles.editBtn}>
                  Edit
                </button>

                <button onClick={() => deletePet(pet.id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  img: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px"
  },
  editBtn: {
    background: "#2563eb",
    color: "white",
    padding: "8px",
    margin: "5px"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    padding: "8px",
    margin: "5px"
  },
  saveBtn: {
    background: "green",
    color: "white",
    padding: "8px",
    marginTop: "10px"
  }
};

export default AdminDashboard;