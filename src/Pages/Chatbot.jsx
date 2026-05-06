import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "🐾 Hi! I'm Pawlify Bot!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = { text: data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={msg.sender === "user" ? styles.userMsg : styles.botMsg}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Pawlify..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    padding: "10px",
  },
  chatBox: {
    height: "300px",
    overflowY: "auto",
    marginBottom: "10px",
  },
  userMsg: {
    textAlign: "right",
    background: "#DCF8C6",
    margin: "5px",
    padding: "8px",
    borderRadius: "8px",
  },
  botMsg: {
    textAlign: "left",
    background: "#eee",
    margin: "5px",
    padding: "8px",
    borderRadius: "8px",
  },
  inputArea: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "5px",
  },
  button: {
    padding: "5px 10px",
  },
};