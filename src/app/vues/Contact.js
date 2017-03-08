import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export default class Contact extends React.Component {
    render() {
        return(
            <div id="contact" >
                <Header/>
                <p>Ceci est une page de contact</p>
                <Footer/>
            </div>
        );
    }
}
