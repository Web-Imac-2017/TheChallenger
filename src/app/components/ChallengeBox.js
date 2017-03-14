import React from "react";
import ReadMore from "./ReadMore.js";

export default class ChallengeBox extends React.Component{
	
	handleReadMoreBtnClick(){
		this.refs.readmore.open();
	}
	render(){
		const divStyle = {
            	backgroundImage: 'url(' + this.props.photo + ')'
        	}
		return(
			<div id="challenge_box">
				<div className ="challenge_box__photo background_img" style={divStyle}>
					<img src={this.props.photo}/>
				</div>
				<div className="challenge_box__text">
					<div className="challenge_box__header">
						<h1 className="title">{this.props.title}</h1>
					</div>
					<div className="challenge_box__time">{this.props.time}</div>
					<button id="btn" onClick={this.handleReadMoreBtnClick.bind(this)}>Read More</button>
					<ReadMore ref="readmore" title={this.props.title} desc={this.props.desc}/>
				</div>				
			</div>	
		);
	}
}
