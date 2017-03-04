import React from "react";

require("../../css/_header.scss");

export default class SearchBar extends React.Component {
    render() {
        return(
            <div className="search-bar">
                <form className="search-form">
		     	    <input type="search" name="Your search" className="search-field"/>
                </form>
            </div>
        );
    }
}
