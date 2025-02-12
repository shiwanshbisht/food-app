import React, { useState, useEffect } from "react";

const TextRotator = () => {
  const numbers = [
    "🎉 Free Delivery on Orders Over 200!",
    "📢 New Arrivals are Here!",
    "🔥 Get 10% Off Your First Order!",
    "🚚 Fast and Secure Delivery!",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % numbers.length);
        setIsFlipping(false);
      }, 600); // Flip animation duration
    }, 3000); // Time between flips

    return () => clearInterval(interval);
  }, [numbers.length]);

  const currentNumber = numbers[currentIndex];
  const nextNumber = numbers[(currentIndex + 1) % numbers.length];

  return (
    <div className="flex justify-center items-center bg-black">
      <div className=" w-100%  perspective-1000">
        <div
          className={`absolute top-0 left-0 w-100% text-white font-bold origin-bottom transition-transform duration-500 ease-in-out ${
            isFlipping ? "rotate-x-90" : ""
          }`}
        >
          {currentNumber}
        </div>
      </div>
    </div>
  );
};

export default TextRotator;
