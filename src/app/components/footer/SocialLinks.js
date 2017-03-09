import React from "react";
import Facebook from "./Facebook.js";
import Instagram from "./Instagram.js";
import Twitter from "./Twitter.js";

export default class SocialLinks extends React.Component {
    render() {
        return(
		
         
			 	<div className="social-links col-xs-4 row " >
				
					
					<Facebook/> 
				
				
					<Twitter/>	
					<Instagram/>
				
					
                </div>
		
				
				
        );
    }
}
