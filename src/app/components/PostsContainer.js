import React    from "react";
import PostMin  from "../components/PostMin.js";
import FilterBar from "../components/FilterBar.js";
import Utility from './../utilities/utility.js';

export default class PostsContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            posts : null,
            postsFiltered: null
        };
//        console.log(this.props.posts);
        if(this.props.posts !== undefined){
            this.state = {
                posts: this.props.posts.map((id) => {
                    return(<PostMin postId={id} 
                                    callbackParent={this.callBackPostType.bind(this)}/>);
                })
            };
        }else if(this.props.query !== undefined){
            Utility.query(this.props.query, this.callBackData.bind(this));
            // remplissage par défaut
            /*this.state = {
                posts: this.state.postsIds.map(()=>{    
                    return(<PostMin postId={1} callbackParent={this.callBackPostType.bind(this)}/>);
                })
            };*/
        }
        //console.log(this.state.posts);
        this.filterBar = <FilterBar updateParent={this.updatePostsFiltered.bind(this)} filters={{
            "all": "All",
            "audio":"Audio",
            "video": "Video",
            "image": "Image",
            "text": "Text",
            "file": "Fichier"
        }} />;

        
        this.state = {
            postsFiltered: this.state.posts
        };
      }

    callBackPostType(postId, type) {
        this.state.postsTypes[postId] = type;
    }

    callBackData(data) {
       /* console.log("CALLBACK POST CONTAINER")
        console.log(data);*/
        let tmp = data == null ? null : data.map((id) => {
                    return(<PostMin postId={id} 
                                    callbackParent={this.callBackPostType.bind(this)} />);
                });
        this.setState({
            posts: tmp,
            postsFiltered : tmp
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
        if(this.state.posts === null)
            return null;
        //{this.filterBar}
        return(
            <div className="posts-container">
                {this.state.postsFiltered}
            </div>
        );
      }
}
