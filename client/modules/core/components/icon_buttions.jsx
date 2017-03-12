import React from "react";
import IconButton from "../containers/icon_button";
class IconButtions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pull-right">
        <IconButton style={{paddingLeft: '0px', fontSize: '30px'}} customClass="fa fa-info-circle fa-2"
                    target="infoModal"/>

        <IconButton style={{paddingLeft: '5px', fontSize: '30px'}}
                    customClass="fa fa-fw fa-plus-circle info-button"
                    target="submitModal"/>
      </div>
    );
  }
}

export default IconButtions;
