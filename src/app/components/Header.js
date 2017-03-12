import React from "react";
import SearchBar from "./header/SearchBar.js";
import LogoArea from "./header/LogoArea.js";
import UserMenu from "./header/UserMenu.js";

export default class Header extends React.Component{
	render(){
		return(
			<div className="header ">
				<SearchBar/>
	            <LogoArea/>
	            <UserMenu user={"Jean-Mich"}/>
			</div>
		);
	}
}
