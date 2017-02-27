import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";
import CopyrightSection from "./CopyrightSection.js";
import SocialLinks from "./SocialLinks.js";

export default class Footer extends React.Component {
    render() {
        /* TODO ne marche pas (le lien) */
        return(
            <footer>
                <CopyrightSection/>
                <SocialLinks/>
                    <Link to="about">About Us</Link>
            </footer>
        );
    }
}
