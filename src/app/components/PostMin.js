import React            from 'react';
import Utility          from './../utilities/utility.js';
import PostProfilBar    from './post/PostProfilBar.js';
import PostContent      from './post/PostContent.js';
import PostLikesbar     from './post/PostLikesBar.js';

export default class PostMin extends React.Component{
    constructor(props){
        super(props);
        const defaultPost ={
            post : {
                "id" : 1,
	              "user" : 1,
                "type" : "audio",
	              "content" : "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/34019569&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
	              "description" : "Je suis une courte description",
                "likes": 5
            }
        };

        this.state = {
            post : defaultPost
        };
        
        this.loadData();	
    }

    loadData(){
        var postId = this.props.postId;
        Utility.query("api/user/show/"+postId, this.callback.bind(this));
    }

    callback(data){
        this.setState ({
            post : data
        });
        this.props.callbackParent(this.state.post.id, this.state.post.type);
    }

    render(){
        if(this.state.post === null)
            return null;
        return(
            <div className="post-min">
                <PostProfilBar userId = {this.state.post.user} />
                <PostContent post = {this.state.post} />
                <PostLikesbar postId = {this.state.post.id} />
            </div>
        );
    }
}
