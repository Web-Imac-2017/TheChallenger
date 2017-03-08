import React from "react";
import LoginBox from "./../components/LoginBox.js";

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
		fetch('api/post/getRandomBackground')
			.then(function(response){
				this.setState({url : response.text})
			})
			.then(function(text) {  
				console.log('Request successful', text);  
			})  
			.catch(function(error) {  
				console.log('Request failed', error)  
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