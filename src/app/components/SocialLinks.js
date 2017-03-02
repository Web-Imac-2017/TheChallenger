import React from "react";
require("../../css/_footer.scss");
import Facebook from "./Facebook.js";
import Instagram from "./Instagram.js";
import Twitter from "./Twitter.js";
require("../../css/_footer.scss");
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
