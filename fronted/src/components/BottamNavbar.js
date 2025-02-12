import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaWallet, FaCartPlus, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState("");
  const [visible, setVisible] = useState(true);
  const cartItem = useSelector((store) => store.cart.items);

  const handleRouteChange = (newRoute) => {
    navigate(`/${newRoute}`);
    setRoute(newRoute); // Update the route state with the correct path.
  };

  useEffect(() => {
    const currentRoute = window.location.pathname.slice(1); // Get the current route without the leading "/".
    setRoute(currentRoute); // Set the initial route state when component mounts.
  }, []);

  const staggerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div>
      <AnimatePresence>
        {visible && (
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed",
              bottom: 0,

              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "500px",
              height: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              background: "#000",
              borderRadius: "20px 20px 0px 0px",
              padding: "10px",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Home Icon */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: route === "" ? "55px" : "25px",
                height: route === "" ? "55px" : "25px",
                borderRadius: "30px",
                backgroundColor: route === "" ? "white" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleRouteChange("")}
            >
              <FaHome size={24} color={route === "" ? "#000" : "gray"} />
            </motion.div>

            {/* Wallet Icon */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: route === "myorder" ? "55px" : "25px",
                height: route === "myorder" ? "55px" : "25px",
                borderRadius: "30px",
                backgroundColor: route === "myorder" ? "white" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleRouteChange("myorder")}
            >
              <FaWallet
                size={24}
                color={route === "myorder" ? "#000" : "gray"}
              />
            </motion.div>

            {/* Cart Icon */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: route === "cart" ? "55px" : "25px",
                height: route === "cart" ? "55px" : "25px",
                borderRadius: "30px",
                backgroundColor: route === "cart" ? "white" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleRouteChange("cart")}
            >
              <FaCartPlus
                size={24}
                color={route === "cart" ? "#000" : "gray"}
              />
              <span className="right-2 -top-2 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                {cartItem.length}
              </span>
            </motion.div>

            {/* User Icon */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: route === "pics" ? "55px" : "25px",
                height: route === "pics" ? "55px" : "25px",
                borderRadius: "30px",
                backgroundColor: route === "pics" ? "white" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleRouteChange("pics")}
            >
              <FaUser size={24} color={route === "pics" ? "#000" : "gray"} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BottomNavBar;
