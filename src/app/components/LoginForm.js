import React from "react";


export default class LoginForm extends React.Component{
	render(){
		return(
			<div>
				<form className="form" method="POST" action="login">
			     	<input type="text" name="email" className="field-in" placeholder="Email"/>
			      	<input type="password" name="password" className="field-in" placeholder="Password"/>
			      	<button className="submit button" href="#">Login</button>
			    </form>
			</div>
		);
	}
}