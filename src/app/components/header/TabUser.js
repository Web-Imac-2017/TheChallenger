import React from "react";

import Utility from "./../../utilities/utility.js"

export default class TabUser extends React.Component {
	

  render() {
    return(
      <div className="tab-user-menu-box" style={{display:"none"}}>
        <div className="tab-user-menu">		
  				<a className="disconnect" href='api/user/logout/'> Disconnect </a>
        </div>
      </div>
    );
  }
	
	
}
