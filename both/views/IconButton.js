App.IconButton = React.createClass({
  handleClick(){
    let {target} = this.props;
    $('#' + target).openModal();
    this.recordClick(target);
  },
  recordClick(link){
    //TODO:
    //create API to save clicks
    //record IP address so that spammers cannot add multiple clicks
    let myIpAddress = this.myIP();

    if(myIpAddress != false)
    {
        request.post("{need API HERE}" + link + "/" + myIpAddress, function(err,data){
            console.log("saved to db")
        });
    }

  },
  myIP()
  {
        if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
        else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
        xmlhttp.send();

        let hostipInfo = xmlhttp.responseText.split("\n");

        for (i=0; hostipInfo.length >= i; i++)
        {
            ipAddress = hostipInfo[i].split(":");
            if ( ipAddress[0] == "IP" ) return ipAddress[1];
        }
        return false;
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
