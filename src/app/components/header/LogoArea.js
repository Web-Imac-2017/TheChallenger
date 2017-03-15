import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";

export default class LogoArea extends React.Component {
    render() {
        return(
            <div id="logo-area" className="logo-area">
            	<Link to={"/home"}>
            		<h1>The Challenger</h1>
            	</Link>
            </div>
        );
    }
}
