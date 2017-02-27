import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router-dom";
import CopyrightSection from "./CopyrightSection.js";
import SocialLinks from "./SocialLinks.js";

export default class Footer extends React.Component {
    render() {
        /* TODO ne marche pas (le lien) */
        return(
            <footer>
                <CopyrightSection/>
                <SocialLinks/>
                <Router>
                    <Link to="#/about">About Us</Link>
                </Router>
            </footer>
        );
    }
}
