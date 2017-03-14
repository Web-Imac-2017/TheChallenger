import React 	from "react";
import PostMin 	from "../components/PostMin.js";
import FilterBar from "../components/FilterBar.js";
import Utility from './../utilities/utility.js';

export default class PostsContainer extends React.Component{
    constructor(props){
		super(props);
        this.state = {
            postsIds: [1,2],
            postsTypes: {},
            posts : null,
            postsFiltered: null
        };

        if(this.props.query !== null){
            Utility.query(this.props.query, this.callBackData.bind(this));
        }
        this.filterBar = <FilterBar updateParent={this.updatePostsFiltered.bind(this)} filters={{
            "all": "All",
            "audio":"Audio",
            "video": "Video",
            "image": "Image",
            "text": "Text",
            "file": "Fichier"
        }} />;

        // remplissage par défaut
        this.state = {
            posts: this.state.postsIds.map(()=>{    
                return(<PostMin postId={1} />);
            })
        };
        this.state = {
            postsFiltered: this.state.posts
        };
	  }

    callBackPostType(postId, type) {
        this.state.postsTypes[postId] = type;
    }

    callBackData(data) {
        console.log("CALLBACK POST CONTAINER");
        console.log(data);
        this.setState({
            postsIds: data,
            posts: data == null ? null : data.map(
                function(id) {
                    return(
                            <PostMin postId={id} callbackParent={this.callBackPostType.bind(this)} />
                    );
                })
        });
        this.updatePostsFiltered("all");
    }

    updatePostsFiltered(filter) {
        // console.log("Filtre: "+filter);
        // let tmpPosts = [];
        // for(let postId in this.state.postsIds) {
        //     let type = this.state.postsTypes[postId];
        //     if(type == filter || filter == "all") {
        //         tmpPosts.push(this.state.posts[postId]);
        //     }
        // }
        // this.setState({
        //     postsFiltered: this.state.posts
            // postsFiltered: tmpPosts
        // });
        // console.log(tmpPosts);
        // console.log(this.state.postsFiltered);
        // console.log(this.state.posts);
    }

	  render(){
		    return(
                <div className="posts-container">
                    {this.filterBar}
                    {this.state.postsFiltered}
                </div>
		    );
	  }
}
