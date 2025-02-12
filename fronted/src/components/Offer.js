import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const Offer = () => {
  const hanldeApplycoupan = () => {
    alert("HELLO WORLD");
  };
  return (
    <>
      <div>
        <button
          onClick={hanldeApplycoupan}
          className="text-green-500 font-bold "
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <BiSolidOffer /> Apply Store offer <IoIosArrowForward />
        </button>
      </div>
    </>
  );
};

export default Offer;
