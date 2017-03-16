import React from "react";
import { BrowserRouter as Router,
         Link } from "react-router";


		 
export default class Vignette extends React.Component {
    render() {
    	var divStyle = {
            backgroundImage: 'url(' + this.props.image + ')'
        }
        let overlay = null;
        if(this.props.overlay !== undefined && this.props.overlay === true)
            overlay = <div className="veil"></div>
        return(
			<div className="img-profil circle-back background_img" style={divStyle}>							
                {overlay}
            </div>
        );
    }
}