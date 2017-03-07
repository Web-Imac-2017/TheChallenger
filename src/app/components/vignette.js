import React from "react";

export default class Vignette extends React.Component {
    render() {
        return(
			<div className="circle-back">
                <img src={this.props.image} alt="vignette" className="img-profil" width="50px" height="50px" />
			</div>
        );
    }
}
