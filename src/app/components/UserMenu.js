import React from "react";
import Vignette from "./vignette.js";

export default class UserMenu extends React.Component {
    render() {
        return(
                <div className="user-menu col-sm-2">
                <Vignette image={"img/no-image.png"}/>
                <div className="user-menu-drop-down">
                <h2>{this.props.user}</h2>
                <p>Profile</p>
                <p>Log out</p>
                </div>
                </div>
        );
    }
}
