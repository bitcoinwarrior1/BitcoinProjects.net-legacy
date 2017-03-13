import React from "react";
class Dapp extends React.Component {

  constructor(props) {
    super(props);
  }

  getStatusColor(status) {
    let statusColors = [
      'light-grey', // 0. Unknown
      'black white-text', // 1. Abandoned
      'red darken-2 white-text', // 2. On Hold
      'grey darken-2 white-text', // 3. Stealth Mode
      'amber accent-1', // 4. Concept
      'amber', // 5. Work In Progress
      'green accent-1', // 6. Demo
      'green accent-2', // 7. Working Prototype
      'light-green accent-3' // 8. live
    ];
    return statusColors[parseInt(status[0], 10)];
  }

  render() {
    var statusColor = 10;
    var link = 'url';
    let {dapp} = this.props;
    return (
      <div className='col ms12 m4 l3 xl2 xxl1'>
        <div className={'card hoverable dapp-card ' + this.getStatusColor(dapp.status)}>
          <div className='card-content'>
            <div className='main-section center-align'>
              <div className='card-title truncate'>
                {link ? <a target='_blank' href={link}>{dapp.name}</a>
                  : dapp.name}
              </div>
              <div className='card-subtitle trunchate'>
                {dapp.contact}
              </div>
              <div className='card-description'>
                <p>{dapp.description}</p>
              </div>
            </div>
            <div className='section status-section'>
              <p className='icon-row center-align'>
                { dapp.url &&
                <a target='_blank' href={dapp.url}>
                  <i className='icon-link fa fa-fw fa-globe'></i>
                </a>
                }
                { dapp.github &&
                <a target='_blank' href={dapp.github}>
                  {dapp.license}
                  <i className='icon-clickaBleIconlink fa fa-fw fa-github'></i>
                </a>
                }
                {dapp.reddit &&
                <a target='_blank' href={dapp.reddit}>
                  <i className='icon-link fa fa-fw fa-reddit'></i>
                </a>
                }
                { dapp.contract_address_mainnet &&
                <a target='_blank' href={'https://etherscan.io/address/' + dapp.contract_address_mainnet}>
                  <i className='icon-link fa fa-fw fa-cogs'></i>
                </a>
                }
                { dapp.contract_address_ropsten &&
                <a target='_blank' href={'https://ropsten.io/address/' + dapp.contract_address_ropsten}>
                  <i className='icon-link fa fa-fw fa-bug'></i>
                </a>

                }
              </p>
              <p className='pull-right'>
                {dapp.last_update}
              </p>
              <p className='status truncate'>
                {dapp.status.substring(3)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dapp.propTypes = {
  dapp: React.PropTypes.object.isRequired
};
Dapp.defaultProps = {
  dapp: {
    name: 'sample dapp',
    description: 'description',
    url: 'url',
    github: 'github',
    status: '6. Demo',
    last_update: '2012',
    reddit: 'reddit',
    contact: ''
  }
};
export default Dapp;