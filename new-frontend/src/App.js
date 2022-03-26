/* eslint-disable no-unused-vars */
import React from "react";
import "./index.css";
import Route from "./view/master/Route";
import Header from "./view/master/Header";
import Menu from "./view/master/Menu";
import Dashboard from "./view/page/Dashboard";
import Topics from "./view/page/Topics";

const menuItems = [
  {
    link: "/",
    name: "Dashboard",
    icon: "m-menu__link-icon  flaticon-interface-3",
  },
  {
    link: "/topics",
    name: "Topics",
    icon: "m-menu__link-icon  flaticon-interface-1",
  },
];

const App = () => (
  <div>
    <Header />
    <div className="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
      <Menu items={menuItems} />
      <div className="m-grid__item m-grid__item--fluid m-wrapper">
        <div className="m-content">
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
        </div>
      </div>
    </div>
    {/*
     */}
  </div>
);

export default App;
