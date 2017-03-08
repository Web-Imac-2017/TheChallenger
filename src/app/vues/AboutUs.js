import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export default class AboutUs extends React.Component {
    render() {
        return(
            <div id="aboutus ">
                <Header/>
                <p>Ceci est une page de A propos</p>
                <Footer/>
            </div>
        );
    }
}
