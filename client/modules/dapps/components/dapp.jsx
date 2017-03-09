import React from "react";

class Dapp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var statusColor = 10;
    var link = 'url';
    return (
      <div className='col ms12 m4 l3 xl2 xxl1'>
        <div className={'card hoverable dapp-card ' + statusColor}>
          <div className='card-content'>
            <div className='main-section center-align'>
              <div className='card-title truncate'>
                {link ? <a target='_blank' href={link}>{this.props.dapp.name}</a>
                  : this.props.dapp.name}
              </div>
              <div className='card-subtitle trunchate'>

              </div>
              <div className='card-description'>
                <p>{this.props.dapp.description}</p>
              </div>
            </div>
            <div className='section status-section'>
              <p className='icon-row center-align'>
                { this.props.dapp.url &&
                <a target='_blank' href={this.props.dapp.url}>
                  <i className='icon-link fa fa-fw fa-globe'></i>
                </a>
                }
                { this.props.dapp.github &&
                <a target='_blank' href={this.props.dapp.github}>
                  {this.props.dapp.license}
                  <i className='icon-clickaBleIconlink fa fa-fw fa-github'></i>
                </a>
                }
                { this.props.dapp.reddit &&
                <a target='_blank' href={this.props.dapp.reddit}>
                  <i className='icon-link fa fa-fw fa-reddit'></i>
                </a>
                }
                { this.props.dapp.contract_address_mainnet &&
                <a target='_blank' href={'https://etherscan.io/address/' + this.props.dapp.contract_address_mainnet}>
                  <i className='icon-link fa fa-fw fa-cogs'></i>
                </a>
                }
                { this.props.dapp.contract_address_ropsten &&
                <a target='_blank' href={'https://ropsten.io/address/' + this.props.dapp.contract_address_ropsten}>
                  <i className='icon-link fa fa-fw fa-bug'></i>
                </a>

                }
              </p>
              <p className='pull-right'>
                {this.props.dapp.last_update}
              </p>
              <p className='status truncate'>
                {this.props.dapp.status.substring(3)}
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
    status: '123132',
    last_update: '2012',
    reddit: 'reddit',
  }
};
export default Dapp;
