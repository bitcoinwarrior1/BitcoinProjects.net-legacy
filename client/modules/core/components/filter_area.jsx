import React from "react";
import {formatHelper} from "/client/helpers/format-helpers";
class FilterArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: 'status',
      sortTypes: ['updated', 'status'],
      sortDirection: 'asc',
    };
  }

  getSortType() {

  }

  toggleSortType() {
    this.setState({sortType: (this.state.sortType == 'status') ? 'updated' : 'status'});
  }

  toggleDirection() {
    this.setState({sortDirection: (this.state.sortDirection == 'asc') ? 'desc' : 'asc'});
  }

  render() {
    let {sortTypes}=this.state;
    let {dappCount, toggleDirection, toggleSortType, sortType, sortDirection}= this.props;
    return (
      <div>
        <div className='filter-area white-text'>
          <div className='col s5'>
            {dappCount} dapps listed
          </div>
          <div className='col s7 right-align'>
            Sort: <a className="sort-direction"
                     onClick={toggleSortType.bind(this)}>{formatHelper.capitalize(sortType)} </a>
            <i className={`sort-direction fa fa-sort-amount-${sortDirection}`}
               onClick={toggleDirection.bind(this)}></i>
          </div>
        </div>

      </div>
    );
  }
}
FilterArea.defaultProps = {
  dappCount: 0
};
export default FilterArea;
