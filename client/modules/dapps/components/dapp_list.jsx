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
          {console.log(dapps)}
          {
            (dapps) ?
              dapps.map((dapp, index) => (
                <Dapp key={index} dapp={dapp}/>
              ))
              :
              <div className='no-results center-align white-text flow-text section'>
                <p>No Dapps Found</p>
              </div>
          }
        </section>
      </div>
    );
  }
}

export default DappList;
