import React from "react";

import FollowBtn from './assets/FollowBtn.js'
import Vignette from './assets/Vignette.js'

export default class ProfilBox extends React.Component{
	render(){
		return(
			<div id="profil_box">
				<div className ="profil_box__photo">
					<Vignette image={this.props.photo}/>
				</div>
				<div className="profil_box__text">
					<div className="profil_box__header">
						<h2 className="title">{this.props.name}</h2>
						<FollowBtn userId={this.props.id}/>
					</div>
					<div className="profil_box__nb">
						<div className="profil_box__nbpost"><b>{this.props.nbPost}</b> Posts</div>
						<div className="profil_box__nbfollow"><b>{this.props.nbFollower}</b> Followers</div>
					</div>
					<div className="profil_box__email">{this.props.email}</div>
					<div className="profil_box__desc">
						<h4>Description</h4>
						<p>{this.props.desc}</p>
					</div>
				</div>				
			</div>	
		);
	}
}
