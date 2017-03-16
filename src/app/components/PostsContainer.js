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

        console.log("POST QUERY")
        console.log(this.props.query);
        if(this.props.posts !== undefined){
            let tmp = this.props.posts.map((id) => {
                return(<PostMin key={this.props.query + id}
                                postId={id} 
                                callbackParent={this.callBackPostType.bind(this)}
                                affFollow={this.props.affFollow}
                                affLikes={this.props.affLikes}/>);
            });
            this.state = {
                posts: tmp,
                data : this.props.posts
            };

        }else if(this.props.query !== undefined){
            Utility.query(this.props.query, this.callBackData.bind(this));
        }

        //console.log(this.state.posts);
        /*this.filterBar = <FilterBar updateParent={this.updatePostsFiltered.bind(this)} filters={{
            "all": "All",
            "audio":"Audio",
            "video": "Video",
            "image": "Image",
            "text": "Text",
            "file": "Fichier"
        }} />;*/
        
        this.state = {
            postsFiltered: this.state.posts,            
            affFollow : this.props.affFollow,
            affLikes : this.props.affLikes,
            data : null
        };
      }

    componentWillReceiveProps() {
        this.setState({
            affFollow : this.props.affFollow,
            affLikes : this.props.affLikes
        });
        this.callBackData.bind(this, this.state.data);
    }

    callBackPostType(postId, type) {
        this.state.postsTypes[postId] = type;
    }

    callBackData(data) {
        console.log("CALLBACK POST CONTAINER")
        console.log(data)
       // console.log(data);
        let tmp = data.map((id) => {
            return(<PostMin key = {"data" +id}
                            postId={id} 
                            callbackParent={this.callBackPostType.bind(this)} 
                            affFollow={this.state.affFollow}
                            affLikes={this.state.affLikes}/>
            );
        });
        console.log(tmp)
        this.setState({
            posts: tmp,
            postsFiltered : tmp,
            data : data
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
                {this.filterBar}
                {this.state.postsFiltered}
            </div>
        );
      }
}
