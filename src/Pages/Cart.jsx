import { useState } from "react";

function Cart({ cart = [], removeFromCart }) {
  const [checkedOut, setCheckedOut] = useState(false);

  // 🧮 CALCULATE TOTAL
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const styles = {
    container: {
      padding: "40px"
    },
    item: {
      display: "flex",
      gap: "20px",
      padding: "15px",
      marginBottom: "15px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    },
    img: {
      width: "80px",
      borderRadius: "10px"
    },
    btn: {
      background: "red",
      color: "white",
      padding: "8px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    },
    checkout: {
      marginTop: "30px",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
    },
    checkoutBtn: {
      marginTop: "10px",
      padding: "12px",
      width: "100%",
      background: "green",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h1>Your Cart 🛒</h1>
      <p>Total Items: {cart.length}</p>

      {cart.length === 0 ? (
        <p>No items yet...</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={styles.item}>
              <img src={item.image} style={styles.img} />

              <div>
                <h2>{item.name}</h2>
                <p>{item.type}</p>

                {/* 💰 PRICE */}
                <p><strong>${item.price}</strong></p>

                <button
                  style={styles.btn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* 🧾 CHECKOUT SECTION */}
          <div style={styles.checkout}>
            <h2>Total: ${totalPrice}</h2>

            {!checkedOut ? (
              <button
                style={styles.checkoutBtn}
                onClick={() => setCheckedOut(true)}
              >
                Proceed to Checkout
              </button>
            ) : (
              <h3>✅ Payment Successful! Thank you 🎉</h3>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;