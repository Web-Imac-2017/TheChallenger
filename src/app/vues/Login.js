import React from "react";
import LoginBox from "./../components/LoginBox.js";
import Utility from "./../utilities/Utility"

require('isomorphic-fetch');
//const imgBG = require ('./../../img/background.jpg');
//const  jsonPath = require('./../json/bg.json');

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
		
		//Utility.getJSON("api/post/getRandomBackground/", this);
		//Utility.getJSON("."+jsonPath, this);

	}

	callback(data){
		console.log("MAMA")
		if(typeof data === 'undefined')
			return;
		console.log(data);
		const path = Utility.getPublicPath;
		console.log(path+data.url)
		this.setState ({url : +data.url});
		this.setState ({artist : data.user});
	}


	render(){
		//var imgUrl = this.state.nextImg ? this.state.nextImgSrc : this.state.song.imgSrc;
        console.log(this.state.url)	
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