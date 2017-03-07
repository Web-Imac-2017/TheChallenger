import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";

import SocialLinks from "./components_footer/SocialLinks.js";
import Contact from "./components_footer/Contact.js";
import AboutUs from "./components_footer/AboutUs.js";



export default class Footer extends React.Component {
	
	constructor (props) {
		super(props);
		
		// ouvrir/fermer la page de contact //
		this.state = { contactActive: false };
		this.openContact = this.openContact.bind(this);
		this.closeContact = this.closeContact.bind(this);
		
		
		// ouvrir/fermer la page about //
		this.state = { aboutActive: false };
		this.openAbout = this.openAbout.bind(this);
		this.closeAbout = this.closeAbout.bind(this);
		
	}
	
	closeContact () {
		this.setState({ contactActive: false });
	};
 
	
	openContact () {
		this.setState({ contactActive: true })
	};
	  
	  
	  
	closeAbout () {
		this.setState({ aboutActive: false });
		
	};
 
	
	openAbout () {
    this.setState({ aboutActive: true })

	};
   
    render() {     
        return(			
										
			<footer >
			
				<div className="the_footer"  >
											
										
					<div className="col-xs-4  ">
						<button id="btn"  onClick={this.openContact}> Contact </button>
					</div>
										
					< SocialLinks/>	
									
					<div className="col-xs-4">
						<button id="btn"  onClick={this.openAbout}> About Us </button>
					</div>
										
					{this.state.contactActive&&(
						<div className ="page_contact">
							<button onClick={this.closeContact} className="close-contact" >
								<img src = "../../img/icons/cross_quit.png"width="30" height="30"/>
							</button>
							<Contact/>
													
						</div>
					)}
										
										
					{this.state.aboutActive&&(
						<div className ="page_about col-lg-6">
							<button onClick={this.closeAbout} className="close-contact" >
								<img src= "../img/icons/cross_quit.png"width="30" height="30"/>
							</button>
							<AboutUs/>
						</div>
					)}					
									
				</div>
				
			</footer>
		
        );
    }
}
