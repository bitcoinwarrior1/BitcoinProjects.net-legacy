import React from "react";
import Dapp from "../containers/dapp";
import FilterArea from "/client/modules/core/containers/filter_area";

class DappList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='row'>
        <FilterArea/>
        <section ref='dappSection' className='dapps row'>
          <Dapp/> <Dapp/>
          <Dapp/>
          <Dapp/>
          <Dapp/>
          <Dapp/>

        </section>
      </div>
    );
  }
}

export default DappList;
