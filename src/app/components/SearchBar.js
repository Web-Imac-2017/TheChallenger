import React from "react";


export default class SearchBar extends React.Component {
    render() {
        return(
            <div className="search-bar col-sm-2">
                <form className="search-form">
		     	    <input type="search" name="Your search" className="search-field"/>
                </form>
            </div>
        );
    }
}
