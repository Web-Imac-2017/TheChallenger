import React from "react";
import ReadMore from "./ReadMore.js";

export default class ChallengeBox extends React.Component{
	
	handleReadMoreBtnClick(){
		this.refs.readmore.open();
	}
	render(){
		return(
			<div id="challenge_box">
				<div className ="challenge_box__photo">
					<img src={this.props.photo}/>
				</div>
				<div className="challenge_box__text">
					<div className="challenge_box__header">
						<h1 className="title">{this.props.title}</h1>
					</div>
					<div className="challenge_box__time">{this.props.time}</div>
					<button id="btn" onClick={this.handleReadMoreBtnClick.bind(this)}>Read More</button>
					<ReadMore ref="readmore" title={this.state.challenge.title} desc={this.state.challenge.desc}/>
				</div>				
			</div>	
		);
	}
}
