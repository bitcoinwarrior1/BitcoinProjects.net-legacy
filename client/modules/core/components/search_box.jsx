import React from "react";
import IconButton from "../containers/icon_button";
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  handleKeyUp() {
    let {searchAction} = this.props;
    let {searchBox} = this.refs;
    searchAction(searchBox.value)
  }

  render() {
    return (
      <div className="row bg-white">
        <div className='search-area'>
          <div className='input-field col s12'>
            <i className='fa fa-fw fa-search prefix'></i>
            <input ref='searchBox' onKeyUp={this.handleKeyUp.bind(this)} type='text' className='search-box'></input>
            <label>Search</label>
          </div>


        </div>
        <div className="pull-right">
          <IconButton style={{paddingLeft: '0px', fontSize: '30px'}} customClass="fa fa-info-circle fa-2"
                      target="infoModal"/>

          <IconButton style={{paddingLeft: '5px', fontSize: '30px'}}
                      customClass="fa fa-fw fa-plus-circle info-button"
                      target="submitModal"/>
        </div>
      </div>
    );
  }
}

export default SearchBox;
