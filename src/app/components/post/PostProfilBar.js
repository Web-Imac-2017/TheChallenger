import React from 'react';
//import BackgroundImage from 'react-background-image-loader';
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
		this.setState({ user : data });
		//this.loadImg(data.photo);
		this.checkFollowing();
	}

	/*loadImg(photo){
		this.setState ({ LoadedImg : img });
	}*/

	checkFollowing(){
		//TODO checker quoi afficher Follow ou following
		//var res = 
	}

	render(){
		if(this.state.user === null)
			return null;
		var divStyle = {
            backgroundImage: 'url(' + this.state.user.photo + ')'
        }
        //TODO Trouver une solution pour les chemins !!
		return(
			<div className="post__profil_bar">
				<Link to={"/profil/"+this.state.user.id}>
					<div 
							style={divStyle} 
							className="profil_pic"/>
					<h4 className="post__profil__pseudo">{this.state.user.name}</h4>
				</Link>
				<button className="follow_btn button" href="#">Follow</button>
			</div>
		);
	}
}