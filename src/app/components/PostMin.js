import React      from 'react';
import Utility      from './../utilities/utility.js';
import PostProfilBar  from './post/PostProfilBar.js';
import PostContent from './post/PostContent.js';
import PostLikesbar from './post/PostLikesBar.js';

export default class PostMin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      post : null
    };
    this.loadData();
  }

  loadData(){
    var postId = this.props.postId;
    //var jsonPath = Object.values(getJSON('/getUser/{'+userId+'}');
    var jsonPath = require('./../json/post'+postId+'.json');
    Utility.getJSON(jsonPath, this);
  }

  callback(data){
    this.setState ({
      post : data
    });
  }

  render(){
    if(this.state.post === null)
      return null;
    return(
            <div className="post-min">
            <PostProfilBar userId = {this.state.post.user} />
            <PostContent postId = {this.state.post.id} />
            </div>
    );
  }
}