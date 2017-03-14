import React from 'react';
//import BackgroundImage from 'react-background-image-loader';
import { BrowserRouter as Router,
         Link } from "react-router";
         
import Utility from './../../utilities/utility.js';
import FollowBtn from './../assets/FollowBtn.js'

export default class PostProfilBar extends React.Component{

	constructor(props){
		super(props);
		const defaultUser ={
			"id" : 1,
			"photo" : "./../../../img/pp.jpg",
			"name" : "michel"
		};
		this.state = {
			user : defaultUser
		};
		this.loadData();
	}

	loadData(){

		var userId = this.props.userId;
//		console.log("BAR USER id :"+userId);
		Utility.query('api/user/show/'+userId, this.callback.bind(this));	
	}

	callback(data){
		this.setState({ user : data });
	}

	render(){
		if(this.state.user === null)
			return null;
		var divStyle = {
            backgroundImage: 'url(' + Utility.getPublicPath() +this.state.user.photo + ')'
    	};
		return(
			<div className="post__profil_bar">
				<Link to={"/profil/"+this.state.user.id}>
					<div	style={divStyle} 
							className="profil_pic background_img"/>
					<h4 className="post__profil__pseudo">{this.state.user.name}</h4>
				</Link>
				<FollowBtn userId={this.state.user.id}/>
			</div>
		);
	}
}
