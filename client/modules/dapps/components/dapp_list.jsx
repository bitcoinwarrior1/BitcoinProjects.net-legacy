import React from "react";
import Dapp from "../containers/dapp";
import FilterArea from "/client/modules/core/containers/filter_area";

class DappList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let {dapps} = this.props;
    return (
      <div className='row'>
        <FilterArea/>
        <section ref='dappSection' className='dapps row'>
          {dapps.map((dapp, index) => (
            <Dapp key={index} dapp={dapp}/>
          ))}
        </section>
      </div>
    );
  }
}

export default DappList;
