import React from "react";

/*
 Pour construire ce bouton, il faut lui donner :
 - "label" : le texte du bouton
 - "property" : une propriété, qui sera donnée en paramètre du callback
 - "callback" : la fonction de callback
 */

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        };
        this.class = this.getClass();
    }

    getClass() {
        return this.state.toggled ? "button toggled" : "button not-toggled";
    }

    click() {
        this.setState({
            toggled: !this.state.toggled
        });
        this.class = this.getClass();
        this.props.callback(this.props.property);
    }

    render() {
        return(
                <button onClick={this.click.bind(this)} className="tag-btn">
            {this.props.label}
            </button>
        );
    }
}
