import React from "react";
import SearchBar from "./SearchBar.js";
import LogoArea from "./LogoArea.js";
import UserMenu from "./UserMenu.js";

export default class Header extends React.Component{
	render(){
		return(
			<div className="header row">
				<SearchBar/>
            <LogoArea/>
            <UserMenu user={"Jean-Mich"}/>
			</div>
		);
	}
}
