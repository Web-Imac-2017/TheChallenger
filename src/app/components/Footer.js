import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router-dom";
import CopyrightSection from "./CopyrightSection.js";
import SocialLinks from "./SocialLinks.js";

export default class Footer extends React.Component {
    render() {
        return(
                <footer>
                <CopyrightSection/>
                <SocialLinks/>
                <Router>
                /* TODO ne marche pas (le lien) */
                <Link to="#/about">About Us</Link>
                </Router>
                </footer>
        );
    }
}
