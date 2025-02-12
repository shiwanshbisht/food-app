import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNavBar from "./BottamNavbar";
import AnnouncementBar from "./Announcementbar";

const Layout = ({ children }) => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      {children}
      <div className="mt-20 sm:hidden">
        <BottomNavBar />
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
