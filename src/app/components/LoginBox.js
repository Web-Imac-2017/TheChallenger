import React from "react";

import LoginForm from "./LoginForm.js"
import SignUpForm from "./SignUpForm.js"

export default class LoginBox extends React.Component{
	render(){
		return(
			<div id="login_box" className="col-lg-2">
				<h2 className="title">The Challenger</h2>
				<LoginForm/>
				<p>OR</p> 
				<SignUpForm/>
			</div>
		);
	}
}