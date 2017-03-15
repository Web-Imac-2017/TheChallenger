import React from "react";
import Timer from "./assets/Timer.js"

export default class ChallengeBox extends React.Component{
	
	handleReadMoreBtnClick(){
		this.refs.readmore.open();
	}
	render(){
		const divStyle = {
            	backgroundImage: 'url('+this.props.photo + ')'
        };
		return(
			<div id="challenge_box">
				<div className="veil"></div>
				<div className ="background_img" style={divStyle}></div>
				<div className="ligne-vertical"></div>
				<div className="challenge_box__text">
					<h1 className="title">The {this.props.title} Challenge</h1>
					<h4>{this.props.desc}</h4>
					<div className="challenge_box__time">
						<h4>Time left</h4>
						<Timer start={Date.now()} end={this.props.time}/>
					</div>
				</div>	
			</div>	
		);
	}
}
