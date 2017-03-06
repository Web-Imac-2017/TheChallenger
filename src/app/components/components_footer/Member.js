import React from "react";

export default class Member extends React.Component {
    render() {
        return(
            <div className="member">
            	<img src={this.props.image}/>	
            	<h1>{this.props.name}</h1>
            	<p>{this.props.desc }</p>
            </div>
        );
    }
}

