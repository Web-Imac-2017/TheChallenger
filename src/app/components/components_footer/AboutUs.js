import React from "react";
import Member from "./Member.js";

export default class AboutUs extends React.Component {
    render() {
    	var list = [<Member image="../img/members/lisa.jpg" name="Lisa Couavoux" desc="Team Leader"/>,
    				<Member image="../img/members/antoine.jpg" name="Antoine Demiere" desc="Front-end Developper"/>,
    				<Member image="../img/members/lisa.jpg" name="Maël Crespin-Paumier" desc="Front-end Developper"/>,
    				<Member image="../img/members/lisa.jpg" name="Lisa Couavoux" desc="Team Leader"/>,
    				<Member image="../img/members/lisa.jpg" name="Lisa Couavoux" desc="Team Leader"/>,
    				<Member image="../img/members/lisa.jpg" name="Lisa Couavoux" desc="Team Leader"/>,
    				<Member image="../img/members/lisa.jpg" name="Lisa Couavoux" desc="Team Leader"/>,
    				<Member image="../img/members/lisa.jpg" name="Lisa Couavoux" desc="Team Leader"/>];
        return(
            <div className="aboutus ">
               
                <p>The Team</p>
                <p>The best of the best</p>

              
                <div className="membersList">
                	{list}	
                </div>
               
            </div>
        );
    }
}
