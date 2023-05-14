import React, { useState } from "react";
import e_logo from "../assets/e_logo.png";

const Sidebar = ({ isOpen }) => {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (isOpen) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  return (
    <>
      {/* Sidebar */}
      <ul className={style} id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center m-5"
          href="strona-glowna"
        >
          <div className="sidebar-brand-text mx-3">
            <img src={e_logo} alt="" />
          </div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <a className="nav-link" href="strona-glowna">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Strona główna</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Elementy</div>
        {/* Nav Item - Items */}
        <li className="nav-item">
          <a className="nav-link" href="produkty">
            <i className="fas fa-fw fa-chart-area" />
            <span>Produkty</span>
          </a>
        </li>
        {/* Nav Item - Add Item */}
        <li className="nav-item">
          <a className="nav-link" href="dodaj-produkt">
            <i className="fas fa-fw fa-table" />
            <span>Dodaj produkt</span>
          </a>
        </li>
        {/* Nav Item - Orders */}
        <li className="nav-item">
          <a className="nav-link" href="zamowienia">
            <i className="fas fa-fw fa-table" />
            <span>Zamówienia</span>
          </a>
        </li>
        {/* Nav Item - Users */}
        <li className="nav-item">
          <a className="nav-link" href="uzytkownicy">
            <i className="fas fa-fw fa-table" />
            <span>Użytkownicy</span>
          </a>
        </li>
        {/* Nav Item - Settings */}
        <li className="nav-item">
          <a className="nav-link" href="ustawienia">
            <i className="fas fa-fw fa-wrench" />
            <span>Ustawienia</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={changeStyle}
          />
        </div>
      </ul>
      {/* End of Sidebar */}
    </>
  );
};

export default Sidebar;
