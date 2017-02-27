import React from "react";

require("../../css/_header.scss");

export default class SearchBar extends React.Component {
    render() {
        return(
            <div className="SearchBar">
                <form className="search-form">
		     	    <input type="text" name="Your search" className="search-field"/>
                    <button className="search-button">[OK]</button>
                </form>
            </div>
        );
    }
}
