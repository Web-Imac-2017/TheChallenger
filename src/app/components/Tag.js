import React from "react";

export default class Tag extends React.Component {
       
    render() {
        return(
                <button className="tag-btn">{this.props.name}</button>
        );
    }
}
