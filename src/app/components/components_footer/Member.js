import React from "react";

export default class Member extends React.Component {
    render() {
        return(
            <div className="member col-xs-6">
            	<img src={this.props.image} className="col-lg-4"/>	
            	<h2 className="col-lg-8">{this.props.name}</h2>
            	<p className="col-lg-8">{this.props.desc }</p>
            </div>
        );
    }
}

