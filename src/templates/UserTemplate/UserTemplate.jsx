import Header from "./../../components/Header/Header";
import Footer from "./../../components/Footer/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

const UserTemplate = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserTemplate;
