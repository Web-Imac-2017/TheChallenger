import React from "react";
import Header from "./../components/Header.js";
import Footer from "./../components/Footer.js";

export default class Post extends React.Component {
    render() {
        return(
            <div className="post-vue">
            <Header />
            TODO Je suis un post.
            <Footer/>
            </div>
        );
    }
}
