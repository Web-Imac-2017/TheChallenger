import React from "react";
import ReactDom from "react-dom";

export default class SearchBar extends React.Component {
    constructor (props){		
		super(props);
		
		
			

		this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
		
		
	}
	
	mouseOver() {
       
		ReactDom.findDOMNode(document.getElementById("logo-area")).style="opacity : 0.2; " ;
		ReactDom.findDOMNode(document.getElementById("user-menu")).style="opacity : 0.2; " ;
    }
	
    mouseOut() {
        
		ReactDom.findDOMNode(document.getElementById("logo-area")).style="opacity : 1; " ;
		ReactDom.findDOMNode(document.getElementById("user-menu")).style="opacity : 1; " ;
    }
	
	render() {
        return(
            <div className="search-bar">
                <form className="search-form" >
		     	    <input type="search" name="Your search" className="search-field" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}/>
                </form>
            </div>
        );
    }
}
