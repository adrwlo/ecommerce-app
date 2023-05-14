import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FormEdit from "../components/FormEdit";

const EditItem = () => {
  return (
    <>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <FormEdit />
        </div>
      </div>
    </>
  );
};

export default EditItem;
