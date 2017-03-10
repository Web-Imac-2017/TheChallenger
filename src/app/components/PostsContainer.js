import React 	from "react";
import PostMin 	from "../components/PostMin.js";
import FilterBar from "../components/FilterBar.js";
import Utility from './../utilities/utility.js';

export default class PostsContainer extends React.Component{
	  constructor(props){
		    super(props);
        this.setState({
            posts: null
        });
        // Utility.getJSON("api/user/show/"+postId, this);
        this.filterBar = <FilterBar updateParent={()=>console.log("click")} filters={{"all": "All", "pasAll":"Pas All"}} />;
	  }

	  render(){
		    return(
            <div className="posts-container">
                {this.filterBar}
            {this.state.posts}
            </div>
		    );
	  }
}
