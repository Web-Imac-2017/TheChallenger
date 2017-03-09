import React 	from "react";
import PostMin 	from "../components/PostMin.js";

export default class PostsContainer extends React.Component{
	  constructor(props){
		    super(props);
        this.setState({
            posts: [
                    <PostMin postId={1} />,
                    <PostMin postId={2} />
            ]
        });

	  }

	  render(){
		    return(
            <div className="posts-container">
            </div>
		    );
	  }
}
