import React from 'react';
//import BackgroundImage from 'react-background-image-loader';
import { BrowserRouter as Router,
         Link } from "react-router";
         
import Utility from './../../utilities/utility.js';
import FollowBtn from './../assets/FollowBtn.js';
import DeleteBtn from './../assets/DeleteBtn.js'

export default class PostProfilBar extends React.Component{

	constructor(props){
		super(props);
		const defaultUser = {
			"id" : 1,
			"photo" : "./../../../img/pp.jpg",
			"name" : "michel"
		};
		this.state = {
			user : null,
			suppBtn: false
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
		Utility.isConnected(this.callBackConnectedUser.bind(this));
	}

	callBackConnectedUser(id){
		if(id == this.state.user.id){
			this.setState({suppBtn : true})
		}
	}

	render(){
		if(this.state.user === null)
			return null;

		const  divStyle = {
            backgroundImage: 'url(' + Utility.getPublicPath() +this.state.user.photo + ')'
    	};
    	let followBtn = <FollowBtn userId={this.state.user.id}/>;
    	if(!this.props.affFollow){
    		followBtn = null;
    	}
    	let suppBtn = null;
        if(this.state.suppBtn){
        	suppBtn = <DeleteBtn postId={this.props.postId}/>
        }

		return(
			<div className="post__profil_bar" id={this.state.user.id}>
				<Link to={"/profil/"+this.state.user.id}>
					<div	style={divStyle} 
							className="profil_pic background_img"/>
					<h4 className="post__profil__pseudo">{this.state.user.name}</h4>
				</Link>
				{followBtn}
				{suppBtn}
			</div>
		);
	}
}
