import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";

import SocialLinks from "./footer/SocialLinks.js";
import Contact from "./footer/Contact.js";
import AboutUs from "./footer/AboutUs.js";



export default class Footer extends React.Component {
	  
	handleAboutBtnClick(){	
		window.scrollTo(0, document.getElementById("app").scrollTop);
		this.refs.about.open();
	}
	
	handleContactBtnClick(){
		this.refs.contact.open();
	}
	
   
    render() {   

        return(			
										
			<footer className="the_footer">				
				<button id="btn"  onClick={this.handleAboutBtnClick.bind(this)}>About Us</button>
									
				<SocialLinks/>	
						
				<button id="btn"   onClick={this.handleContactBtnClick.bind(this)}>Contact</button>
						
				<AboutUs ref="about"/>		

				<Contact ref="contact"/>
							
			</footer>
        );
    }
}
