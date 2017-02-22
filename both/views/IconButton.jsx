App.IconButton = React.createClass({
  handleClick(){
    let {target} = this.props;
    $('#' + target).openModal()
  },
  componentDidMount(){
  },
  componentDidUpdate(){

  },
  runModal(){
  },
  render(){
    let {style, customClass, target} = this.props;
    return (
      <i ref='iconButton' style={style}
         className={`${customClass} modal-trigger`}
         data-target={target}
         onClick={this.handleClick}
      ></i>
    );
  }
})
;
