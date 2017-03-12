import React from "react";
import IconButtons from "../containers/icon_buttions";

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
          <IconButtons/>
        </div>

      </div>
    );
  }
}

export default SearchBox;
