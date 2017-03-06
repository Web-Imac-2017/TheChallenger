import React from "react";

export default class Member extends React.Component {
    render() {
        return(
            <div className="member col-lg-6">
            	<img src={this.props.image} className="memberImage"/>	
            	<h1>{this.props.name}</h1>
            	<p>{this.props.desc }</p>
            </div>
        );
    }
}

