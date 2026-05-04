import { useLocation, useParams } from "react-router-dom";

function PetDetails({ addToCart, pets = [] }) {
  const { state } = useLocation();
  const { id } = useParams();

  // 🧠 Get pet from navigation OR fallback from pets list
  const pet =
    state || pets.find((p) => String(p.id) === String(id));

  if (!pet) return <h2>No pet found 🐾</h2>;

  const description =
    pet.description ||
    `${pet.name} is a lovely ${pet.type} from the ${pet.category} category. 
    It is healthy, friendly, and ready for adoption into a caring home.`;

  return (
    <div style={styles.container}>

      <img src={pet.images?.[0] || pet.image} style={styles.image} />

      <h1>{pet.name}</h1>
      <p>{pet.type} • {pet.category}</p>
      <h3>💰 ${pet.price}</h3>

      <div style={styles.box}>
        <h3>About this pet 🐾</h3>
        <p>{description}</p>
      </div>

      {/* 🛒 CONNECTED TO CART */}
      <button
        style={styles.button}
        onClick={() => addToCart(pet)}
      >
        Add to Cart 🛒
      </button>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto"
  },
  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "15px"
  },
  box: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "20px",
    textAlign: "left"
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

export default PetDetails;