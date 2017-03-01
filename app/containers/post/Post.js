import React from 'react';
import styles from './style.scss';
import {getPostBySlug, resetPost} from '../../actions';
import {connect} from 'react-redux';
import * as templates from '../../templates/post';
import {FetchData}from '../fetchData/FetchData';
import {withRouter} from 'react-router';

export class Post extends React.Component {
    static serverData;
    static fetchData(dispatch, props) {
        return dispatch(getPostBySlug(props.params.slug))
            .then(result => {
                Post.serverData = result.value;
            });
    }

    constructor() {
        super();
        this.templates = {};

        this.state = {
            post: Post.serverData
        };

        Post.serverData = null;
    }

    componentWillMount() {
        if (!this.state.post) {
            this.props.dispatch(getPostBySlug(this.props.params.slug));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.post) {
            this.setState({
                post: nextProps.post
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetPost());
    }

    render() {

        if (!this.state.post) {
            return <p>Loading</p>;
        }
        let Tpl = this.templates[this.props.params.slug] || templates.Default;
        return (<Tpl post={this.state.post}/>)
    }
}


function mapStateToProps(state) {
    return {
        post: state.posts.current
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
