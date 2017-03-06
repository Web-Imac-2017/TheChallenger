import React from "react";
import Member from "./Member.js";

export default class AboutUs extends React.Component {
    render() {
    	var list = [<Member image="../img/members/lisa.jpg" name="Lisa Couavoux" desc="Team Leader"/>,
    				<Member image="../img/members/valentin.jpg" name="Valentin Bacon" desc="Graphist"/>,
                    <Member image="../img/members/antoine.jpg" name="Antoine Demiere" desc="Front-end Developper"/>,
                    <Member image="../img/members/mael.jpg" name="Maël Crespin-Pommier" desc="Front-end Developper"/>,
    				<Member image="../img/members/laure.jpg" name="Laure Issa" desc="Back-end Developper"/>,
    				<Member image="../img/members/quentin.jpg" name="Quentin Louis" desc="Back-end Developper"/>,
    				<Member image="../img/members/marc.jpg" name="Marc Blactot" desc="Back-end Developper"/>,
    				<Member image="../img/members/albert.jpg" name="Albert-Henry Moyrand" desc="Back-end Developper"/>];
        return(
            <div className="aboutus">
                <h1>The Team</h1>
                <p>The best of the best</p>
                <div className="membersList">
                	{list}	
                </div>
               
            </div>
        );
    }
}
