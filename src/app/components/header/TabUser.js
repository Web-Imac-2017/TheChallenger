import React from "react";

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
