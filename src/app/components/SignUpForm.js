import React from "react";

export default class SignUpForm extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	    formVisible:false,
	    pwdIsWrong : false
	  };
	}  

	handleClick(){
		var tmp = this.state.formVisible? false:true;
		this.setState({ formVisible: tmp });
	}

	handleLostFocus(){
		this.checkSamePassword();
	}

	checkSamePassword(){
		if(this.refs.pwd1.value === this.refs.pwd2.value){
			this.setState({pwdIsWrong: false});
			return true;
		}
		this.setState({pwdIsWrong: true});
		return false;	
	}

	handleSubmitClick(e){
		if(!this.checkSamePassword()) 
			e.preventDefault();
	}

	render(){
		var formStyle = {display : this.state.formVisible?'block':'none'}
		var pwdError = this.state.pwdIsWrong?"error":""

		return(
			<div>
				<div>
					<button className="submit button" href="#" onClick={this.handleClick.bind(this)}>Create an account</button>
				</div>
				<div style={formStyle}>
					<form className="form" ref="sign_up_form" method="POST" action="user.php">
				     	<input type="text" name="pseudo" className="field-in" placeholder="Pseudo"/>
				     	<input 
				     		type="email" 
				     		name="email" 
				     		className="field-in" 
				     		placeholder="Email"
				     	/>
				      	<input 
				      		type="password" 
				      		name="password" 
				      		ref="pwd1" 
				      		className="field-in" 
				      		placeholder="Password"
				      	/>
				      	<input 
				      		type="password" 
				      		name="re-password"
				      		ref="pwd2" 
				      		className={"field-in "+ pwdError} 
				      		placeholder="Confirm your password" 
				      		onBlur={this.handleLostFocus.bind(this)}
				      	/>
				      	<button className="submit button" onClick={this.handleSubmitClick.bind(this)}>Sign Up</button>
				    </form>
			    </div>
			</div>
		);
	}
}