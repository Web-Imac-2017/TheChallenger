import React from "react";

export default class Vignette extends React.Component {
    render() {
        return(
                <img src={this.props.image} alt="vignette" />
        );
    }
}
