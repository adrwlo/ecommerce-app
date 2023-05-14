import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Page404 from "../components/Page404";

const Setting = () => {
  return (
    <>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <Page404 />
        </div>
      </div>
    </>
  );
};

export default Setting;
