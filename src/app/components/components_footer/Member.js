import React from "react";

export default class Member extends React.Component {
    render() {
        return(
            <div className="member col-lg-6 col-sm-10">
            	<img src={this.props.image} className="col-lg-4"/>	
            	<h4 className="col-lg-8">{this.props.name}</h4>
            	<p className="col-lg-8">{this.props.desc }</p>
            </div>
        );
    }
}

