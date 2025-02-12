import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Menuitem } from "../components/Menuitem";
import { CartProvider } from "../context/Cart";
import { Carousels } from "../components/Carousels";
import Swipe from "../components/Swipe";
import Testimonial from "../components/Testimonial";
import Instagramfeed from "../components/Instagramfeed";
import Announcementbar from "../components/Announcementbar";
import BottomNavBar from "../components/BottamNavbar";
import Slick from "../components/Slick";
import TextRotator from "../components/TextRotator";
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
          <Swipe />
          <Instagramfeed />
          <Testimonial />
        </Layout>
      </CartProvider>
    </>
  );
}

export default Home;
