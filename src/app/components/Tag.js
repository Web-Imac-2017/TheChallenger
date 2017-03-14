import React from "react";

export default class Tag extends React.Component {
    click() {
        if(this.props.callbackParent)
            this.props.callbackParent(this.props.value);
    }

    render() {
        return(
                <button className="tag-btn" onClick={this.click.bind(this)}>{this.props.name}</button>
        );
    }
}
