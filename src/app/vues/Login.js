import React from "react";
import LoginBox from "./../components/LoginBox.js";
import Utility from "./../utilities/utility.js";

require('isomorphic-fetch');
//const imgBG = require ('./../../img/background.jpg');
//const  jsonPath = require('./../json/bg.json');

export default class Login extends React.Component{
	constructor(props) {
	  super(props);

	  this.state = {
	  	url : './../../img/background.jpg',
	  	artist: "jeanMi"
	  };

	  this.getRandomImg();
	}
	/*
	componentDidMount(){
		setInterval(changeImgBG(), 10000);
	}*/	

	getRandomImg(){
		Utility.query("api/post/getRandomBackground/", this.callback.bind(this));
		//Utility.query("."+jsonPath, this);

	}

	callback(data){
		if(typeof data === 'undefined' || data.url == null)
			return;
		const path = Utility.getPublicPath();
		this.setState ({url : path+data.url});
		this.setState ({artist : data.user});
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
