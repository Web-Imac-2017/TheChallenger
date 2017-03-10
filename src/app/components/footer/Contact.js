import React from "react";
import Header from "../Header.js";
import Footer from "../Footer.js";

const logoCross = require("./../../../img/icons/cross.png");

export default class Contact extends React.Component {
	constructor (props) {
        super(props);

        this.state = { active: false };
        this.open = this.open.bind(this);
    }
    close () {
        this.setState({ active: false });
    }
    open () {
        this.setState({ active: true });
    }
    
    render() {
    	var myStyle =   {
            display : (this.state.active)?"block":"none"
        };
        return(
        	 <div className ="page_contact" style={myStyle}>
                <div className= "overlay"></div>
            	<div className="contact">
           			<button onClick={this.close.bind(this)} className="close-aboutus" >
                        <img src= {logoCross} width="30" height="30"/>
                    </button>

                	<p className="text-top">Give us some news</p>
					<form action="Message" name="envoi" method="POST" enctype="text/plain">				
    					<input type="Name" name="name" className="field-contact" placeholder="Your Name"/>
    					<input type="Email" name="email" className="field-contact" placeholder="Your e-mail"/>
    					<input type="Subject" name="subject" className="field-contact" placeholder="Subject"/>    				    
    					<textarea type = "Message" className="field-contact" >Your Message</textarea>
    					<button className="field-contact" href="#">Send</button>
					</form>
				</div>
            </div>
        );
    }
}
