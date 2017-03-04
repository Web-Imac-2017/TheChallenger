import React from 'react';
import Link from 'react-router';
import Utility from './../../utilities/utility.js';


export default class PostProfilBar extends React.Component{

	constructor(props){
		super(props);
		this.state ={
			user : null
		}
		this.loadData();
	}

	loadData(){
		console.log("bite")
		var userId = this.props.userId;
		//var data = Object.values(getJSON('/getUser/{'+userId+'}');
		var jsonPath = require('./../../json/user'+userId+'.json');
		alert("PATH = " + jsonPath);
		Utility.getJSON(jsonPath, function(res){
			//var data = Object.values(res);
			console.log(res);
			this.setState({ user : data });
			this.loadImg();
			this.checkFollowing();
		});

		
	}

	loadImg(){
		if(typeof this.state.user.photo !== 'undefined'){
			console.log('erreur photo user n'+this.props.userId);
			return;
		}
		img = require(this.state.user.photo);
		this.state = { LoadedImg : img };
	}

	checkFollowing(){
		//TODO checker quoi afficher Follow ou following
		//var res = 
	}

	render(){
		return(
			<div className="post__profil_bar">
				<Link to="userProfil" params={{ userId: this.state.user.id }}>
					<img src={this.state.LoadedImg} alt="" className="profil_pic"/>
					<h3>{this.state.user.name}</h3>
				</Link>
				<button className="follow_btn button" href="#">FOLLOW</button>
			</div>
		);
	}
}