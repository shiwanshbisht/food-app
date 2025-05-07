import React, { useEffect, useState } from "react";

const AnnouncementBar = () => {
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

  return (
    <div className="bg-red-500 text-white flex justify-center items-center py-3 px-4">
      <div className="relative w-full max-w-screen-sm overflow-hidden">
        <div
          className={`flex justify-center items-center text-lg font-bold whitespace-nowrap transition-transform duration-500 ease-in-out ${
            isFlipping ? "rotate-x-90" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {currentNumber}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

// return (
//   <div>
//     <div className="bg-black text-white py-2">
//       <div className="overflow-hidden relative">
//         <div className="animate-marquee flex whitespace-nowrap">
//           <span className="mx-4">🎉 Free Delivery on Orders Over 200!</span>
//           <span className="mx-4">📢 New Arrivals are Here!</span>
//           <span className="mx-4">🔥 Get 10% Off Your First Order!</span>
//           <span className="mx-4">🚚 Fast and Secure Delivery!</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );
