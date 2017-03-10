import React 	from "react";
import PostMin 	from "../components/PostMin.js";
import FilterBar from "../components/FilterBar.js";
import Utility from './../utilities/utility.js';

export default class PostsContainer extends React.Component{
	  constructor(props){
		    super(props);
        this.state = {
            postsIds: null,
            posts : null,
            postsFiltered: null
        };
        Utility.query("api/winners", this.callBackData.bind(this));
        this.filterBar = <FilterBar updateParent={()=>console.log("click")} filters={{"all": "All", "pasAll":"Pas All"}} />;
	  }

    callBackData(data) {
        this.setState({
            postsIds: data,
            posts: data == null ? null : data.map((id) => {return(<PostMin postId={id} />);})
        });
        this.updatePostsFiltered("all");
    }

    updatePostsFiltered(filter) {
        // TODO faire le tri
        this.setState({
            postsFiltered: this.state.posts
        });
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
