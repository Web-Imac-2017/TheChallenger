import React from "react";
import Vignette from "./Vignette.js";

export default class UserMenu extends React.Component {
    render() {
        return(
                <div className="user-menu col-sm-2">
                	<Vignette image={"img/no-image.png"}/>
                </div>
        );
    }
}
