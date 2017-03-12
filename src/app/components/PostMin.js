import React            from 'react';
import Utility          from './../utilities/utility.js';
import PostProfilBar    from './post/PostProfilBar.js';
import PostContent      from './post/PostContent.js';
import PostLikesbar     from './post/PostLikesBar.js';

export default class PostMin extends React.Component{
    constructor(props){
        super(props);
        const defaultPost ={
            "iduser" : 4, 
		    "id" : 26
        };

        this.state = {
            post : defaultPost
        };
        
        this.loadData();	
    }

    loadData(){
        var postId = this.props.postId;
        console.log("POSTID POST MIN : "+postId);
        console.log(postId);
        Utility.query("api/post/show/"+postId, this.callback.bind(this));
    }

    callback(data){
        console.log("POST SHOW CALLBACK")
        console.log(data)
        this.setState ({
            post : data
        });
    }

    render(){
        console.log("IDUSER");
        console.log(this.state.post.iduser)
        console.log(this.state.post)
        if(this.state.post === null)
            return null;
        return(
            <div className="post-min">
                <PostProfilBar userId = {this.state.post.iduser} />
                <PostContent postId = {this.state.post.id} />
                <PostLikesbar postId = {this.state.post.id} />  
            </div>
        );
    }
}
