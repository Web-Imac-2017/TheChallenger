import React from "react";

export default class SearchBar extends React.Component {
    render() {
        return(
                <div class="SearchBar">
				        <form className="search-form">
			     	    <input type="text" name="Your search" className="field-in"/>
			      	  <button className="search-button">search</button>
			          </form>
                </div>
        );
    }
}
