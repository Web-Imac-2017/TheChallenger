import React 	from "react";
import PostMin 	from "../components/PostMin.js";
import FilterBar from "../components/FilterBar.js";
import Utility from './../utilities/utility.js';

export default class PostsContainer extends React.Component{
    constructor(props){
		super(props);
        this.state = {
            postsIds: [1,2,3,4,5],
            postsFiltered: null
        };
        console.log(this.props.posts);
        if(this.props.posts !== undefined){
            this.state = {
                posts: this.props.posts.map((post) => {return(<PostMin postId={post.id} />);})
            };
        }else if(this.props.query !== undefined){
            Utility.query(this.props.query, this.callBackData.bind(this));
            console.log("POSTS REQUETES ENVOYEE");
            // remplissage par défaut
            this.state = {
                posts: this.state.postsIds.map(()=>{    
                    return(<PostMin postId={1} />);
                })
            };
        }
        console.log(this.state.posts);
        this.filterBar = <FilterBar updateParent={()=>console.log("click")} filters={{"all": "All", "pasAll":"Pas All"}} />;
        this.updatePostsFiltered("all");
	  }

    callBackData(data) {
       /* console.log("CALLBACK POST CONTAINER")
        console.log(data);*/
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
