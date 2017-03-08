import React from "react";
import LoginBox from "./../components/LoginBox.js";
import Utility from "./../utilities/Utility"

require('isomorphic-fetch');
//const imgBG = require ('./../../img/background.jpg');

export default class Login extends React.Component{
	constructor(props) {
	  super(props);

	  this.getRandomImg();

	  this.state = {
	  	url : './../../img/background.jpg',
	  	artist: "jeanMi"
	  };
	}
	/*
	componentDidMount(){
		setInterval(changeImgBG(), 10000);
	}*/	

	getRandomImg(){
		
		Utility.getJSON("api/post/getRandomBackground/", this);
	}

	callback(data){
		console.log("MAMA")
		if(typeof data === 'undefined')
			return;
		console.log(data);
		this.setState ({
	      url : data.url
	    });
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
				<span className="artist"><p>by {this.state.artist}</p></span>
				<LoginBox/>
			</div>
		);
	}

}