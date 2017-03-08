import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

export default class PostProfilBar extends React.Component{

	constructor(props){
		super(props);
		this.state ={
			user : null, 
			LoadedImg : null
		}
		this.loadData();
	}

	loadData(){
		var userId = this.props.userId;
		//var data = Object.values(getJSON('/getUser/{'+userId+'}');
		var jsonPath = require('./../../json/user'+userId+'.json');
		Utility.getJSON(jsonPath, this);	
	}

	callback(data){
		console.log(data);
		this.setState({ user : data });
		//this.loadImg(data.photo);
		this.checkFollowing();
	}

	loadImg(photo){
		console.log(photo)
		const img = require(String(photo));
		this.setState ({ LoadedImg : img });
	}

	checkFollowing(){
		//TODO checker quoi afficher Follow ou following
		//var res = 
	}

	render(){
		if(this.state.user === null)
			return null;
		return(
			<div className="post__profil_bar">
				<Link to={"/profil/"+this.state.user.id}>
					<img src={this.state.user.photo} alt="" className="profil_pic"/>
					<h3>{this.state.user.name}</h3>
				</Link>
				<button className="follow_btn button" href="#">FOLLOW</button>
			</div>
		);
	}
}