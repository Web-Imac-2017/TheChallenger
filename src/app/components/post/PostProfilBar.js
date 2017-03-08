import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

export default class PostProfilBar extends React.Component{

	constructor(props){
		super(props);
		const defaultUser ={
			"id" : 1,
			"photo" : "./../../../img/pp.jpg",
			"name" : "michel"
		}
		this.state ={
			user : defaultUser
		}
		this.loadData();
	}

	loadData(){
		var userId = this.props.userId;
		//var data = Object.values(getJSON('/getUser/{'+userId+'}');
		//var jsonPath = require('./../../json/user'+userId+'.json');
		Utility.getJSON('api/user/show/'+userId, this);	
	}

	callback(data){
		console.log(data);
		this.setState({ user : data });
		//this.loadImg(data.photo);
		this.checkFollowing();
	}

/*	loadImg(photo){
		console.log(photo)
		const img = require(String(photo));
		this.setState ({ LoadedImg : img });
	}*/

	checkFollowing(){
		//TODO checker quoi afficher Follow ou following
		//var res = 
	}

	render(){
		if(this.state.user === null)
			return null;
		const path = Utility.getPublicPath();
		return(
			<div className="post__profil_bar">
				<Link to={"/profil/"+this.state.user.id}>
					<img src={path+this.state.user.photo} alt="" className="profil_pic"/>
					<h3>{this.state.user.name}</h3>
				</Link>
				<button className="follow_btn button" href="#">FOLLOW</button>
			</div>
		);
	}
}