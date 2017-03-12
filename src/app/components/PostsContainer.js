import React 	from "react";
import PostMin 	from "../components/PostMin.js";
import FilterBar from "../components/FilterBar.js";
import Utility from './../utilities/utility.js';

export default class PostsContainer extends React.Component{
    constructor(props){
		super(props);
        this.state = {
            postsIds: [1,2,3,4,5],
            posts : this.props.posts,
            postsFiltered: null
        };

        if(this.props.query !== null){
            Utility.query(this.props.query, this.callBackData.bind(this));
            console.log("POSTS REQUETES ENVOYEE");
            // remplissage par défaut
            this.state = {
                posts: this.state.postsIds.map(()=>{    
                    return(<PostMin postId={1} />);
                })
            };
        }
        this.filterBar = <FilterBar updateParent={()=>console.log("click")} filters={{"all": "All", "pasAll":"Pas All"}} />;
        this.updatePostsFiltered("all");
	  }

    callBackData(data) {
        console.log("CALLBACK POST CONTAINER")
        console.log(data);
        this.setState({
            postsIds: data,
            posts: data == null ? null : data.map((post) => {return(<PostMin postId={post.id} />);})
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
