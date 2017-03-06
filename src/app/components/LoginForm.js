import React from "react";

export default class LoginForm extends React.Component{
	render(){
		return(
			<div className="form-group">
				<form className="form" method="POST" action="api/user/login/">
			     	<input type="email" name="email" className="field-in form-control" placeholder="Email" require/>
			      	<input type="password" name="password" className="field-in form-control" placeholder="Password" require/>
			      	<button className="submit btn btn-default" href="#">Login</button>
			    </form>
			</div>
		);
	}
}