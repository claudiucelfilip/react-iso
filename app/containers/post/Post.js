import React from 'react';
import styles from './style.scss';
import { getPostBySlug } from '../../actions';
import { connect } from 'react-redux';
import * as templates from '../../templates/post';

export class Post extends React.Component {

    static fetchData(dispatch, props) {
        return dispatch(getPostBySlug(props.params.slug));
    }

    constructor() {
        super();
        this.templates = {};
    }

    componentWillMount() {
        let slug = this.props.params.slug || '';
        if (!this.props.posts[slug]) {
            this.props.dispatch(getPostBySlug(slug));
        }
    }

    render() {
        let post = this.props.posts[this.props.params.slug];
        if (!post) {
            return <p>Loading</p>;
        }
        let Tpl = this.templates[this.props.params.slug] || templates.Default;
        return (<Tpl post={post}/>)
    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
