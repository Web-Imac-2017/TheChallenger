import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";


		 
export default class Vignette extends React.Component {
    render() {
    	var divStyle = {
            backgroundImage: 'url(' + this.props.image + ')'
        }

        return(
			<div className="img-profil circle-back background_img" style={divStyle}>								
			</div>
        );
    }
}