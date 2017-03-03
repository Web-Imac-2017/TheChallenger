import React from "react";

export default class LoginForm extends React.Component{
	render(){
		return(
			<div>
				<form className="form" method="POST" action="login">
			     	<input type="email" name="email" className="field-in" placeholder="Email" required/>
			      	<input type="password" name="password" className="field-in" placeholder="Password" required/>
			      	<button className="submit button" href="#">Login</button>
			    </form>
			</div>
		);
	}
}