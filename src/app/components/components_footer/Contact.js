import React from "react";
import Header from "../Header.js";
import Footer from "../Footer.js";

export default class Contact extends React.Component {
    render() {
        return(
            <div className="contact row" >
           
                <div className="text-top"> <p>Send us a message :) </p> </div>
				<form action="Message" name="envoi" method="POST" enctype="text/plain">				
					<input type="Name" name="name" className="field-contact " placeholder="Your Name"/>
			
				<input type="Email" name="email" className="field-contact" placeholder="Your e-mail"/>
				
				<input type="Subject" name="subject" className="field-contact " placeholder="Subject"/>
			    
				<textarea type = "Message" className="field-contact-message" >
				Your Message</textarea>
				<button className="envoyer button" href="#">Send</button>
			
				

				</form>
            </div>
        );
    }
}
