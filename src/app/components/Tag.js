import React from "react";

export default class Tag extends React.Component {
    constructor() {
        super(props);
    }
       
    render() {
        return(
                <button className="tag-btn">{this.props.name}</button>
        );
    }
}
