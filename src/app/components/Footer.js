import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";

import SocialLinks from "./SocialLinks.js";

export default class Footer extends React.Component {
    render() {
		
        /* TODO ne marche pas (le lien) */
        return(
	
				<footer >
					<div className="the_footer row"  >
						
						
						<Link to="contact"> Contact  </Link>
						
						< SocialLinks/>	
							
						<Link to="about"> About us   </Link>
						
					</div>
				
				
				</footer>
		
        );
    }
}
