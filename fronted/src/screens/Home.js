import React, { useEffect, useState } from "react";
import { Menuitem } from "../components/Menuitem";
import { CartProvider } from "../context/Cart";
import { Carousels } from "../components/Carousels";
import Slick from "../components/Slick";
import MyLocation from "../components/MyLocation";
import Layout from "../components/Layout";

function Home() {
  return (
    <>
      <CartProvider>
        <Layout>
          <MyLocation />
          <Carousels />
          <Slick />
          <Menuitem />
        </Layout>
      </CartProvider>
    </>
  );
}

export default Home;
