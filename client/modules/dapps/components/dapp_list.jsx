import React from "react";
import SearchBox from "/client/modules/core/containers/search_box";
import InfoModal from "/client/modules/core/containers/info_modal";
import FilterArea from "/client/modules/core/containers/filter_area";
import SubmitModal from "/client/modules/core/containers/submit_modal";

class DappList extends React.Component {
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
        <div className='black'>
          <div className='row'>
            <FilterArea/>
            <section ref='dappSection' className='dapps row'>
            </section>
          </div>
          <footer className='white-text center-align'>
            <div className='row'>
              <div className='col s12 m4'>
                Service by <a target='_blank' href='http://ethercasts.com/'>EtherCasts</a>
              </div>
              <div className='col s12 m4'>
                UI by <a target='_blank' href='http://hitchcott.com'>Hitchcott</a>
              </div>
              <div className='col s12 m4'>
                Fork me on <a target='_blank' href='https://github.com/EtherCasts/state-of-the-dapps'><i
                className='fa fa-fw fa-github'></i>GitHub</a>
              </div>
            </div>
          </footer>
        </div>

        <SubmitModal />
      </div>
    );
  }
}

export default DappList;
