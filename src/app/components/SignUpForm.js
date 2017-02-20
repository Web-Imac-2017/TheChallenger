import React from "react";


export default class SignUpForm extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	    formVisible:false
	  };
	}  

	handleClick(){
		var tmp = this.state.formVisible? false:true;
		this.setState({ formVisible: tmp });
	}

	render(){
		var value = this.state.formVisible?'block':'none';
		var formStyle = {
			display : value
		}

		return(
			<div>
				<div>
					<button className="submit button" href="#" onClick={this.handleClick.bind(this)}>Create an account</button>
				</div>
				<div style={formStyle}>
					<form className="form" method="POST" action="singUp">
				     	<input type="text" name="pseudo" className="field-in" placeholder="Pseudo"/>
				     	<input type="text" name="email" className="field-in" placeholder="Email"/>
				      	<input type="password" name="password" className="field-in" placeholder="Password"/>
				      	<input type="password" name="password" className="field-in" placeholder="Confirm your password"/>
				      	<button className="submit button" href="#">Login</button>
				    </form>
			    </div>
			</div>
		);
	}
}