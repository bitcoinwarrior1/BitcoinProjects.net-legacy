import React from "react";
import Dapp from "../containers/dapp";
class DappList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section ref='dappSection' className='dapps row'>
        <Dapp/> <Dapp/>
        <Dapp/>
        <Dapp/>
        <Dapp/>
        <Dapp/>

      </section>
    );
  }
}

export default DappList;
