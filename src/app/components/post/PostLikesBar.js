import React from 'react';
import { BrowserRouter as Router,
         Link } from "react-router";
import Utility from './../../utilities/utility.js';

const likeImg = require("./../../../img/icons/like.png");
const noLikeImg = require("./../../../img/icons/no-like.png");

export default class PostLikesBar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            post: this.props.post,
            userLike : false
        };  
    }

    componentWillReceiveProps() {
        this.setState({post: this.props});
        this.loadData();
    }

    loadData(){
        Utility.query("api/post/like/check/"+this.state.post.id, this.callbackisLiking.bind(this));
    }

    callbackisLiking(data) {
        //console.log(data);
        this.setState({
            userLike: data.code
        });
    }

    callBackLike(data){
        if(data.code == '1'){
            this.setState({userLike : true});
        }else{
            console.log("ERROR LIKE "+data.message)
        }
    }

     callBackUnlike(data){
        if(data.code == '1'){
            this.setState({userLike : false});
        }else{
            console.log("ERROR UNLIKE "+data.message)
        }
    }

    handleClick(){
        const postId = this.state.post.id;
        if(this.state.userLike)
            Utility.query("api/post/like/delete/"+postId, this.callBackLike.bind(this));
        else
            Utility.query("api/post/like/add/"+postId, this.callBackLike.bind(this));
        
    }
    render(){
        if(this.state.post == null) return null;
        let likes = <p>{this.state.post.likes}</p>;
        if(this.props.affLikes)
            likes = null;
        const coeur = this.state.userLike ? likeImg : noLikeImg;
        return(
            <div className="post-likes-bar" id={this.props.postId}>
                
                <img src={coeur} alt="likes" onClick={this.handleClick.bind(this)} />
                {likes}

            </div>
        );
    }
}
