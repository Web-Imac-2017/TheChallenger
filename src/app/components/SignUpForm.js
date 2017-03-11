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
		  var formStyle = {display : this.state.formVisible?'block':'none'};
		  var pwdError = (this.state.pwdIsWrong)?" error":"";
		return(
			<div>
				<div>
					<button className="button btn btn-default" href="#" onClick={this.handleClick.bind(this)}>Create an account</button>
				</div>
				<div style={formStyle}>
					<form className="form" ref="sign_up_form" method="POST" action="api/user/register/">
				     	<input type="text" name="name" className="field-in form-control" placeholder="Pseudo" required/>
				     	<input 
				     		type="email" 
				     		name="email" 
				     		className="field-in form-control" 
				     		placeholder="Email"
				     	required/>
				      	<input 
				      		type="password" 
				      		name="pwd" 
				      		ref="pwd1" 
				      		className="field-in form-control" 
				      		placeholder="Password"
				      	required/>
				      	<input 
				      		type="password" 
				      		name="pwdconfirm"
				      		ref="pwd2" 
				      		className={"field-in form-control "+ pwdError} 
				      		placeholder="Confirm your password" 
				      		onBlur={this.handleLostFocus.bind(this)}
				      	required/>
				      	<button className="submit btn btn-default" onClick={this.handleSubmitClick.bind(this)}>Sign Up</button>
				    </form>
			    </div>
			</div>
		);
}
}
