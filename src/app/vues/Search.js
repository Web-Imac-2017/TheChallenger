import React from 'react';
import Header from './../components/Header.js';
import Footer from './../components/Footer.js';
import PostsContainer from './../components/PostsContainer.js';
import Utility from "./../utilities/utility.js";

export default class SearchVue extends React.Component {
    constructor(props) {
        super(props);
        this.searchString = this.props.params.searchString;
        this.state = {
            posts: [],
            msgNoResult: (<p>No result</p>)
        }
        let data = {
            search: this.searchString,
            searchtype: "post"
        }
        Utility.queryPost("search/", data, this.callBackQuery);
    }

    callBackQuery(data) {
        if(data.code != undefined && data.code == 0) {
            this.setState({
                posts: []
            });

        } else {
            this.setState({
                posts: data,
                msgNoResult: null
            });
        }
    }

    render() {
        const urlQuery = "api/search/" + this.searchString;
        return(
            <div className="search-vue">
                <Header />
                <div>
                    <h3 id="search-title">Search results for: {this.searchString}</h3>
                    <PostsContainer posts={this.state.posts}
                                    affFollow={true}
                                    affLikes={true}/>
                    {this.state.msgNoResult}
                </div>
                <Footer />
            </div>
        )
    }
}
