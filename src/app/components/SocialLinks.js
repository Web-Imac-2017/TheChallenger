import React from "react";
import Facebook from "./Facebook.js";
import Instagram from "./Instagram.js";
import Twitter from "./Twitter.js";
export default class SocialLinks extends React.Component {
    render() {
        return(
		
         
			 	<div className="social-links row col-xs-offset-4 col-xs-4" >
				
					
					<Facebook/> 
				
				
				
					<Twitter/>	
					<Instagram/>
				
					
                </div>
		
				
				
        );
    }
}
