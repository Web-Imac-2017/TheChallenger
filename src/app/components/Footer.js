import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";

import SocialLinks from "./SocialLinks.js";
import Contact from "./Contact.js";
import AboutUs from "./AboutUs.js";
require("../../css/_footer.scss");


export default class Footer extends React.Component {
	
	constructor (props) {
    super(props);
	
    this.state = { contactActive: false };
	this.openContact = this.openContact.bind(this);
	this.closeContact = this.closeContact.bind(this);
	
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
		
        /* TODO ne marche pas (le lien) */
        return(
							
										
				<footer >
					<div className="the_footer row"  >
											
										
											
							
										
								
										//<Link to="about" > </Link>
										<div className="col-xs-offset-1 col-xs-3">
										<button id="btn"  onClick={this.openContact}> Contact </button>
										</div>
										
										
										< SocialLinks/>	
									
										
										<div className="col-xs-offset-2 col-xs-2">
										<button id="btn"  onClick={this.openAbout}> About </button>
										</div>
										
										
										
										{this.state.contactActive&&(
												<div className ='modalDialog'>
												
											
													<button onClick={this.closeContact}>close contact</button>
													
													<Contact/>
													
												</div>
										)}
										
										
										{this.state.aboutActive&&(
												<div className ='page_about'>
												
											
													<button onClick={this.closeAbout}>close about</button>
													
													<AboutUs/>
													
												</div>
										)}					
									
									
									
					</div>
				
				
				</footer>
		
        );
    }
}
