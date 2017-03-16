import React from 'react';
import Header from './../components/Header.js';
import Footer from './../components/Footer.js';
import PostsContainer from './../components/PostsContainer.js';

export default class SearchVue extends React.Component {
    constructor(props) {
        super(props);
        this.searchString = this.props.params.searchString;
    }    

    render() {
        const urlQuery = "api/search/" + this.searchString;
        return(
            <div className="search-vue">
                <Header />
                <h3 id="search-title">Search results for: {this.searchString}</h3>
                <PostsContainer query={urlQuery}
                                affFollow={true}
                                affLikes={true}/>
                <Footer />
            </div>
        )
    }
}
