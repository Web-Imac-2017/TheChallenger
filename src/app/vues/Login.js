import React from "react";
import LoginBox from "./../components/LoginBox.js";
import Utility from "./../utilities/utility.js";
import WhatIsIt from "./../components/WhatIsIt.js";
const bottomArrow = require("./../../img/icons/bottomArrow.png");
require('isomorphic-fetch');
//const imgBG = require ('./../../img/background.jpg');
//const  jsonPath = require('./../json/bg.json');

export default class Login extends React.Component{
	constructor(props) {
	  super(props);

	  const defaultState = {
	  	url : './../../img/background3.jpg',
	  	artist: "jeanMi"
	  }

	  this.state = {
	  	url : null,
	  	artist : null
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
		
		var ypos,image,elem,elem2;

		function parallax(){
			ypos=window.pageYOffset;
			image=document.getElementById('login');
			image.style.top = ypos * .8 + 'px';
		}
		
		var scrolldelay=2;
		window.onload = function (){ 
		
			elem=document.getElementById('arrow');
			elem2=document.getElementById('what-is-it');
			
			elem.onclick = function pageScroll() {	
								window.scrollBy(0,50);
								scrolldelay = setTimeout(pageScroll,20);
								if(window.pageYOffset > elem2.offsetHeight )
								{
									clearTimeout(scrolldelay);
								}	
			}
			
		};		
		window.addEventListener('scroll',parallax);
	 // <div className="overlay"></div>
		return(
		<div id="page-login">
			
			<div id="login">

				<div className="background_img" id="background-x"style={divStyle}>	
					<img src={bottomArrow} id="arrow" className="arrow" alt="Mountain View"/> 
				</div>
				<span className="artist"><p>by {this.state.artist}</p></span>
				<LoginBox/>
				
			</div>
			
			<div id="page-bottom">
				<WhatIsIt/> 
			</div>
		
		</div>	
		
		
		);
	}

}
