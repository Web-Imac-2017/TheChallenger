import React from "react";
import Utility from './../../utilities/utility.js';

export default class FollowBtn extends React.Component{
	constructor(props){
		super(props);
		
		const user = this.props.userId;
		this.state ={
			user : this.props.userId,
			follow : false,
			unfollow : false,
			display : true
		};
    	Utility.query('api/user/follow/check/'+user, this.isFollowingCallBack.bind(this));
	}

	componentWillReceiveProps() {
        this.setState({user: this.props.userId});
        this.loadData();
    }

    loadData(){
    	const user = this.props.userId;
    	Utility.query('api/user/follow/check/'+user, this.isFollowingCallBack.bind(this));
    }

	isFollowingCallBack(data){
		this.changeFollow(data, true);
	}

	unFollowCallback(data){
		this.changeFollow(data, false);
		this.setState({unfollow :false});
	}

	followCallback(data){
		this.changeFollow(data, true);
	}

	changeFollow(data, follow){
		if(data.code == '1'){
			this.setState({follow : follow});
			//console.log("CHANGER FOLLOW : "+this.state.follow);
		}
		else if(data.code == '3'){
			this.setState({display : false});
		}
	}

	handleFollowClick(){
		if(this.state.follow){
			Utility.query('api/user/follow/delete/'+this.state.user, this.unFollowCallback.bind(this));
		}else
			Utility.query('api/user/follow/add/'+this.state.user, this.followCallback.bind(this));
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
		if(!this.state.display)
			return null;
		var strFollow = "Follow";
		if(this.state.follow){
			strFollow = "Following";
			if(this.state.unfollow)
				strFollow = "Unfollow";
		}

		return(
			<button id={this.state.user} className="follow_btn button" 
					onClick={this.handleFollowClick.bind(this)}
					onMouseEnter={this.handleMouseEnter.bind(this)}
					onMouseLeave={this.handleMouseLeave.bind(this)}>
				{strFollow}					
			</button>
		);
	}
}
