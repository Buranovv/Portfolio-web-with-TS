import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./index";

const FrontLayout = () => {
  return (
    <Fragment>
      <Header />
      <main className="userMain">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default FrontLayout;
