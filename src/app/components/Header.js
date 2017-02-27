import React from "react";
import SearchBar from "./SearchBar.js";
import LogoArea from "./LogoArea.js";
import UserMenu from "./UserMenu.js";

export default class Header extends React.Component{
	render(){
		return(
			<header>
				<SearchBar/>
            <LogoArea/>
            <UserMenu/>
			</header>
		);
	}
}
