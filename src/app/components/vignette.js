import React from "react";

export default class Vignette extends React.Component {
    render() {
        return(
                <div className="vignette">
                <img src={this.props.image} alt="vignette image" />
                </div>
        );
    }
}
