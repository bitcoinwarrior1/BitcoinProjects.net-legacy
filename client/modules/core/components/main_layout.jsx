import React from "react";
import Header from "/client/modules/core/containers/header";
import Footer from "/client/modules/core/containers/footer";
const Layout = ({content = () => null}) => (
  <div>
    <Header/>
    <div className='black'>
      {content()}
      <Footer/>
    </div>
  </div>
);

export default Layout;
