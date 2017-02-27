import React from "react";
import LoginBox from "./../components/LoginBox.js"

export default class Login extends React.Component{
	constructor(props) {
	  super(props);
	  
	  this.state = {
	  	url :"img/background.jpg"
	  };
	}
	/*
	componentDidMount(){
		setInterval(changeImgBG(), 10000);
	}*/

	changeImgBG(){

	}

	render(){
		//var imgUrl = this.state.nextImg ? this.state.nextImgSrc : this.state.song.imgSrc;
        var divStyle = {
            backgroundImage: 'url(' + this.state.url + ')'
        }

		return(
			<div id="login">
				<div className="background_img blur" style={divStyle}></div>
				<div className="overlay"></div>
				<LoginBox/>
			</div>
		);
	}

}