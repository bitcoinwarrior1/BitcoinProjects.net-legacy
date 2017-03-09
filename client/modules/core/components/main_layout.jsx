import React from "react";
import Header from "/client/modules/core/containers/header";
import Footer from "/client/modules/core/containers/footer";
import FilterArea from "/client/modules/core/containers/filter_area";
const Layout = ({content = () => null}) => (
  <div>
    <Header/>
    <div className='black'>
      <div className='row'>
        <FilterArea/>
        {content()}
        <Footer/>
      </div>
    </div>
  </div>
);

export default Layout;
