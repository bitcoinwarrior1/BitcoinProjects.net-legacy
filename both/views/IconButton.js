App.IconButton = React.createClass({
  handleClick(){
    let {target} = this.props;
    $('#' + target).openModal();
    this.recordClick(target);
  },
  recordClick(link)
  {
    request.post("https://op-return.herokuapp.com/bitcoinprojects/" + link, function(err,data)
    {
        console.log("saved click to db");
    });

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
         className={`${customClass} iconButton`}
         data-target={target}
         onClick={this.handleClick}
         aria-hidden="true"
      ></i>
    );
  }
})
;
