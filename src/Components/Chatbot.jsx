import { useEffect, useRef, useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "🐾 Hi! I'm Pawlify Assistant. How can I help you today?",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // ✅ SEND MESSAGE
  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = {
    text: input,
    sender: "user",
  };

  setMessages((prev) => [...prev, userMessage]);

  const userInput = input.toLowerCase();
  setInput("");
  setIsTyping(true);

  setTimeout(() => {
    let reply = "🤖 Sorry, I don't understand that yet.";

    // ✅ GREETINGS
    if (["hello", "hi", "hey"].some(word => userInput.includes(word))) {
      reply = "🐾 Hello! Welcome to Pawlify AI Assistant.";
    }

    // ✅ HOW ARE YOU
    else if (userInput.includes("how are you")) {
      reply = "😊 I'm doing great and ready to help your pets!";
    }

    // ✅ DOGS
    else if (userInput.includes("dog")) {
      reply = "🐶 We have amazing dog breeds available in our shop.";
    }

    // ✅ CATS
    else if (userInput.includes("cat")) {
      reply = "🐱 Cats are loving companions. Check our cat section.";
    }

    // ✅ FOOD
    else if (userInput.includes("food")) {
      reply = "🍖 We sell healthy pet food for dogs and cats.";
    }

    // ✅ TOYS
    else if (userInput.includes("toy")) {
      reply = "🧸 We have balls, chew toys, and scratching posts.";
    }

    // ✅ PRICE
    else if (userInput.includes("price") || userInput.includes("cost")) {
      reply = "💰 Prices depend on breed or product type.";
    }

    // ✅ DELIVERY
    else if (userInput.includes("delivery")) {
      reply = "🚚 We offer safe and fast delivery services.";
    }

    // ✅ PAYMENT
    else if (userInput.includes("mpesa") || userInput.includes("payment")) {
      reply = "💳 We support secure M-Pesa payments.";
    }

    // ✅ VET / HEALTH
    else if (userInput.includes("sick") || userInput.includes("vet")) {
      reply = "🏥 Please visit a vet for proper treatment.";
    }

    // ✅ GROOMING
    else if (userInput.includes("groom")) {
      reply = "✂️ Regular grooming keeps pets healthy.";
    }

    // ✅ TRAINING
    else if (userInput.includes("train")) {
      reply = "🎓 Use positive reinforcement for pet training.";
    }

    // ✅ SHOP
    else if (userInput.includes("shop")) {
      reply = "🛒 Visit our shop page to explore pets & products.";
    }

    // ✅ CART
    else if (userInput.includes("cart")) {
      reply = "🛍️ Your selected items are stored in the cart.";
    }

    // ✅ CONTACT
    else if (userInput.includes("contact")) {
      reply = "📞 You can contact Pawlify support anytime.";
    }

    // ✅ HOURS
    else if (userInput.includes("hours")) {
      reply = "⏰ We are open daily from 8AM to 8PM.";
    }

    // ✅ THANKS
    else if (userInput.includes("thank")) {
      reply = "❤️ You're welcome!";
    }

    // ✅ GOODBYE
    else if (userInput.includes("bye")) {
      reply = "👋 Goodbye! See you again at Pawlify.";
    }

    const botMessage = {
      text: reply,
      sender: "bot",
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  }, 800);
};

  return (
    <>
      {/* FLOAT BUTTON */}
      {!isOpen && (
        <button
          style={styles.floatingButton}
          onClick={() => setIsOpen(true)}
        >
          🐾
        </button>
      )}

      {/* CHAT WINDOW */}
      <div
        style={{
          ...styles.container,
          transform: isOpen ? "translateY(0)" : "translateY(120%)",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <div>🐶 Pawlify AI</div>

          <div>
            <button
              style={styles.minBtn}
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? "🔼" : "🔽"}
            </button>

            <button
              style={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>

        {/* CHAT BOX */}
        {!isMinimized && (
          <div style={styles.chatBox}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={
                  msg.sender === "user"
                    ? styles.userWrapper
                    : styles.botWrapper
                }
              >
                <div
                  style={
                    msg.sender === "user"
                      ? styles.userMsg
                      : styles.botMsg
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* TYPING */}
            {isTyping && (
              <div style={styles.botWrapper}>
                <div style={styles.typing}>
                  <span style={styles.dot}></span>
                  <span style={styles.dot}></span>
                  <span style={styles.dot}></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>
        )}

        {/* INPUT */}
        <div style={styles.inputArea}>
          <input
            type="text"
            placeholder="Ask Pawlify..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={styles.input}
          />

          <button onClick={sendMessage} style={styles.sendBtn}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "350px",
    height: "520px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999,
    transition: "0.4s ease",
  },

  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    border: "none",
    background: "#ff6b81",
    color: "#fff",
    fontSize: "28px",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    zIndex: 9999,
  },

  header: {
    background: "linear-gradient(135deg,#ff6b81,#ff8e53)",
    color: "#fff",
    padding: "15px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },

  minBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    marginRight: "10px",
  },

  chatBox: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    background: "#f5f7fb",
  },

  userWrapper: { display: "flex", justifyContent: "flex-end" },
  botWrapper: { display: "flex", justifyContent: "flex-start" },

  userMsg: {
    background: "#ff6b81",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "15px 15px 0 15px",
    margin: "6px 0",
    maxWidth: "80%",
  },

  botMsg: {
    background: "#fff",
    padding: "10px 14px",
    borderRadius: "15px 15px 15px 0",
    margin: "6px 0",
    maxWidth: "80%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #eee",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },

  sendBtn: {
    marginLeft: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    background: "#ff6b81",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  typing: {
    background: "#fff",
    padding: "10px",
    borderRadius: "15px",
    display: "flex",
    gap: "5px",
    margin: "6px 0",
  },

  dot: {
    width: "6px",
    height: "6px",
    background: "#999",
    borderRadius: "50%",
    animation: "bounce 1s infinite",
  },
};