import { useEffect, useState } from "react";

export default function Carousel() {
  const images = [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a"
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 🎨 INLINE CSS */}
      <style>{`
        .carousel {
          width: 100%;
          max-width: 850px;
          margin: 40px auto;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.25);
          background: #000;
        }

        .slide img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease-in-out;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          font-size: 22px;
          padding: 12px 16px;
          cursor: pointer;
          border-radius: 50%;
          z-index: 2;
          transition: 0.3s;
        }

        .arrow:hover {
          background: rgba(0,0,0,0.85);
        }

        .left {
          left: 15px;
        }

        .right {
          right: 15px;
        }

        .dots {
          text-align: center;
          padding: 10px;
          background: white;
        }

        .dot {
          height: 10px;
          width: 10px;
          margin: 0 5px;
          display: inline-block;
          border-radius: 50%;
          background: #bbb;
          cursor: pointer;
          transition: 0.3s;
        }

        .dot.active {
          background: #000;
          transform: scale(1.3);
        }
      `}</style>

      {/* 🐾 CAROUSEL UI */}
      <div className="carousel">
        {/* Left button */}
        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>

        {/* Image */}
        <div className="slide">
          <img src={images[current]} alt="pawlify pet" />
        </div>

        {/* Right button */}
        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>

        {/* Dots navigation */}
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={index === current ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}