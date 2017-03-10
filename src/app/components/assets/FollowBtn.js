import React from "react";
import Utility from './../../utilities/utility.js';

export default class ProfilBox extends React.Component{
	constructor(props){
		super(props);
		const user = this.props.userId;
		this.state ={
			user : user,
			follow : false,
			unfollow : false
		};
		Utility.query('api/user/isFollowing/'+user, this.isFollowingCallBack.bind(this));
	}

	isFollowingCallBack(data){
		this.changeFollow(data, true);
	}

	unFollowCallback(data){
		this.changeFollow(data, false);
	}

	followCallback(data){
		this.changeFollow(data, true);
	}

	changeFollow(data, follow){
		if(data.code === '1'){
			this.setState({follow : follow});
		}
		else
			console.log(data.message);
	}

	handleFollowClick(){
		if(this.state.follow){
			Utility.query('api/user/follow/delete/'+this.state.user, this.unFollowCallback.bind(this));
		}else
			Utility.query('api/user/follow/add/'+this.state.user);
	}

	handleMouseEnter(){
		if(this.state.follow)
			this.setState({unfollow :true});

	}
	
	handleMouseLeave(){
		if(this.state.follow)
			this.setState({unfollow :false});
	}

	render(){
		var strFollow = (this.state.follow)? "Following" : "Follow";
		(this.state.unfollow)?strFollow = "Unfollow":null;
		return(
			<button className="follow_btn button" 
					onClick={this.handleFollowClick.bind(this)}
					onMouseEnter={this.handleMouseEnter.bind(this)}
					onMouseLeave={this.handleMouseLeave.bind(this)}>
				{strFollow}					
			</button>
		);
	}
}
