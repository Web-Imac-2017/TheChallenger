import React from "react";

export default class Member extends React.Component {
    render() {
        return(
        	<div className="member">
            	<img src={this.props.image}/>	
            	<h4>{this.props.name}</h4>
            	<p>{this.props.desc }</p>
        	</div>
        );
    }
}

