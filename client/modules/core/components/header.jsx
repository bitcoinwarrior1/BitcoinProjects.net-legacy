import React from "react";
import InfoModal from "/client/modules/core/containers/info_modal";
import SubmitModal from "/client/modules/core/containers/submit_modal";

import SearchBox from "/client/modules/core/containers/search_box";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='scroll-to-top'>
          <i className='fa fa-fw fa-arrow-up'></i>
        </div>
        <div ref='navArea' className='header-container container'>
          <header className='center-align'>
            <h1>State of the Ðapps</h1>
          </header>
          <section>
            <SearchBox />
          </section>
        </div>
        <InfoModal />
        <SubmitModal />

      </div>
    );
  }
}

export default Header;
