import React            from 'react';
import Utility          from './../utilities/utility.js';
import PostProfilBar    from './post/PostProfilBar.js';
import PostContent      from './post/PostContent.js';
import PostLikesBar     from './post/PostLikesBar.js';

export default class PostMin extends React.Component{
    constructor(props){
        super(props);
        const defaultPost = {
            "id" : 1,
            "iduser" : 1,
            "type" : "audio",
            "linkcontent" : "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/34019569&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
            "description" : "Je suis une courte description",
            "likes": 5
        };

        this.state = {
            post : null
        };
        
        console.log("POST ID CA MERE "+this.props.postId);
        
        this.loadData();	
    }

    loadData(){
        var postId = this.props.postId;
         console.log("POSTID POST MIN : "+postId);
        // console.log(postId);
        Utility.query("api/post/show/"+postId, this.callback.bind(this));
    }

    callback(data){
        // console.log("POST SHOW CALLBACK");
        // console.log(data);
        this.setState ({
            post : data
        });
        //this.props.callbackParent(this.state.post.postid, this.state.post.type);
    }

    render(){
  /*      console.log("IDUSER");
        console.log(this.state.post.iduser)
        console.log(this.state.post)*/
        if(this.state.post === null)
            return null;
        return(
            <div className="post-min">
                <PostProfilBar userId = {this.state.post.iduser} />
                <PostContent post = {this.state.post}  preview={1} />
                <PostLikesBar postId = {this.state.post.id} />
            </div>
        );
    }
}
