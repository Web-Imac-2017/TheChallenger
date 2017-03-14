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
				<div className ="background_img" style={divStyle}></div>
				<div className="challenge_box__text">
					<h1 className="title">The {this.props.title} Challenge</h1>
					<div className="challenge_box__time">{this.props.time}</div>
				</div>	
				<div className="challenge_box__readmore">
					<button className="tag-btn" onClick={this.handleReadMoreBtnClick.bind(this)}>Read More</button>			
					<ReadMore ref="readmore" title={this.props.title} desc={this.props.desc}/>
				</div>
			</div>	
		);
	}
}
