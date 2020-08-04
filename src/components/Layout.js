import React from "react";
import Nav from "./Navigation/Nav";

const Layout = ({ children }) => (
  <>
    <Nav />
    <main>{children}</main>
  </>
);

export default Layout;
