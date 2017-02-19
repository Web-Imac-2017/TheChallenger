import React from "react";


export default class BackgroundImg extends React.Component{
	render(){
		return (
			<img className="background_img span_12" src={this.props.url}/>
		)
	}
}