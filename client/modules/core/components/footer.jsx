import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}

export default Footer;
