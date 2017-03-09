import React from "react";

class FilterArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='filter-area white-text'>
          <div className='col s5'>
            2
          </div>
          <div className='col s7 right-align'>
            Sort: <a href='#'></a>
            <i className={'sort-direction'}> sort direction</i>
          </div>
        </div>

      </div>
    );
  }
}

export default FilterArea;
