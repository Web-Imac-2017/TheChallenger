import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export default class TabUser extends React.Component {
	
    render() {
        return(
          <div className="tab-user-menu" style={{display:"none"}}>
               			
					<button className="access-profil"> My Profil </button>
					<button className="disconnect"> Disconnect </button>
               
           </div>
        );
    }
	
	
}
