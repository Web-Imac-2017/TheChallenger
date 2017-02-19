import React from "react";

import LoginForm from "./LoginForm.js"

export default class LoginBox extends React.Component{
	render(){
		return(
			<div id="login_box" className="span_2">
				<h2 className="title">The Challenger</h2>
				<LoginForm/>
				<p>OR</p> 
			</div>
		);
	}
}