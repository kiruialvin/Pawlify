import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Components/Navbar";
import Chatbot from "./Components/Chatbot";
import Footer from "./Components/Footer"; // ✅ KEEP THIS

import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Products from "./Pages/Products";
import AddPet from "./Pages/AddPet";
import SignUp from "./Pages/SignUp";
import PetDetails from "./Pages/Petdetails";
import MpesaPayment from "./Pages/Mpesa";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  const [cart, setCart] = useState([]);
  const [pets, setPets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addNewPet = (newPet) => {
    setPets((prev) => [...prev, newPet]);
  };

  const updatePet = (updatedPet) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
    );
  };

  const deletePet = (id) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  const loginAsAdmin = () => setIsAdmin(true);
  const logoutAdmin = () => setIsAdmin(false);

  return (
    <Router>

      {/* ✅ NAVBAR */}
      <Navbar
        cartCount={cart.length}
        isAdmin={isAdmin}
      />

      {/* ✅ ROUTES */}
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/shop"
          element={<Shop pets={pets} addToCart={addToCart} />}
        />

        <Route
          path="/products"
          element={<Products addToCart={addToCart} />}
        />

        <Route
          path="/pet/:id"
          element={<PetDetails addToCart={addToCart} pets={pets} />}
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />

        <Route
          path="/MpesaPayment"
          element={<MpesaPayment />}
        />

        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminDashboard
                pets={pets}
                deletePet={deletePet}
                updatePet={updatePet}
              />
            ) : (
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                🚫 Admin Only
              </h2>
            )
          }
        />

        <Route
          path="/add-pet"
          element={<AddPet onAddPet={addNewPet} />}
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

      </Routes>

      {/* ✅ GLOBAL CHATBOT (FLOATING) */}
      <Chatbot />

      {/* ✅ GLOBAL FOOTER (NOW ADDED) */}
      <Footer />

    </Router>
  );
}

export default App;