import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
    getPostsByCategory,
    getPageBySlug,
    getPostBySlug
} from '../../actions';

class PrefetchedLink extends React.Component {
    componentDidMount() {
        let slug = this.props.to.replace(/.*\//g, '');
        switch (this.props.type) {
            case 'page':
                return this.props.pages[slug] || this.props.getPage(slug);
            case 'post':
                return this.props.posts[slug] || this.props.getPost(slug);
        }
    }
    render() {


        return (
            <Link to={this.props.to}>
                {this.props.children}
            </Link>
        );
    }
}
function mapStateToProps(state) {
    return {
        posts: state.posts,
        pages: state.pages
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getPage: (slug) => dispatch(getPageBySlug(slug)),
        getPost: (slug) => dispatch(getPostBySlug(slug)),
        getCategory: (slug) => dispatch(getPostsByCategory(slug)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrefetchedLink);
