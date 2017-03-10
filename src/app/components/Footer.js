import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";

import SocialLinks from "./footer/SocialLinks.js";
import Contact from "./footer/Contact.js";
import AboutUs from "./footer/AboutUs.js";



export default class Footer extends React.Component {
	
	constructor (props) {
        super(props);

        // ouvrir/fermer la page de contact //
        this.state = { contactActive: false };
        this.openContact = this.openContact.bind(this);
        this.closeContact = this.closeContact.bind(this);
    }		
	
	
	closeContact () {
		this.setState({ contactActive: false });
	}
 
	
	openContact () {
		this.setState({ contactActive: true });
	}
	  
	  
	handleAboutBtnClick(){
		console.log(this.refs.aboutBtn);
		this.refs.about.open(); 
	}
	
   
    render() {   

        return(			
										
			<footer className="the_footer">				
				<button id="btn"  onClick={this.openContact}>Contact</button>
									
				<SocialLinks/>	
						
				<button id="btn"   onClick={this.handleAboutBtnClick.bind(this)}>About Us</button>
						
				<AboutUs ref="about"/>				
				{this.state.contactActive&&(
					<div className ="page_contact">
						<button onClick={this.closeContact} className="close-contact" >
							<img src = "../../img/icons/cross_quit.png"width="30" height="30"/>
						</button>
						<Contact/>
												
					</div>
				)}			
			</footer>
		
        );
    }
}
