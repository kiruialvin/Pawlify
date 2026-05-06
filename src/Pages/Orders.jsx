import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Orders</h2>

      {orders.map((o, i) => (
        <div key={i}>
          <p>Amount: Ksh {o.amount}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}