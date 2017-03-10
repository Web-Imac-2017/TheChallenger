import React from "react";

export default class Member extends React.Component {
    render() {
        return(
            <li className=" col-lg-6 col-xs-12">
            	<div className="member">
	            	<img src={this.props.image} className="col-lg-4"/>	
	            	<h4 className="col-xs-8">{this.props.name}</h4>
	            	<p className="col-xs-8">{this.props.desc }</p>
            	</div>
            </li>
        );
    }
}

