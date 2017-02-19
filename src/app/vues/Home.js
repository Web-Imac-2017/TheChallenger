import React from "react";
import LoginBox from "./../components/LoginBox.js"
import BackgroundImg from "./../components/BackgroundImg.js"

export default class Home extends React.Component{
	render(){
		return(
			<div id="home" className="span_12">
				<LoginBox/>
				<BackgroundImg url="img/background.jpg"/>
			</div>
		);
	}

}