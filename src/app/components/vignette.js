import React from "react";

export default class Vignette extends React.Component {
	constructor(props){
		super(props);
		const img = require(this.props.image);
		this.state = {
			image : '.'+img
		}
	}

    render() {
        return(
			<div className="circle-back">
                <img src={this.state.image} alt="vignette" className="img-profil" width="50px" height="50px" />
			</div>
        );
    }
}
