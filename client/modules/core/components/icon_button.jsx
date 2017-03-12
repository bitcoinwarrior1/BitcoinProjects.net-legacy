import React from "react";

class IconButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    let {target} = this.props;
    $('#' + target).openModal()
  }

  render() {
    let {style, customClass, target} = this.props;
    return (
      <i ref='iconButton' style={style}
         className={`${customClass} iconButton`}
         data-target={target}
         onClick={this.handleClick.bind(this)}
         aria-hidden="true"
      ></i>
    );
  }
}

export default IconButton;
