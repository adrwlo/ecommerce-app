import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FormAdd from "../components/FormAdd";

const AddItem = () => {
  return (
    <>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <FormAdd />
        </div>
      </div>
    </>
  );
};

export default AddItem;
