import React from 'react';
import styles from './style.scss';
import {getPostBySlug} from '../../actions';
import {connect} from 'react-redux';
import * as templates from '../../templates/post';
import {FetchData}from '../fetchData/FetchData';

export class Post extends React.Component {
    static fetchData(dispatch, props) {
        return dispatch(getPostBySlug(props.params.slug));
    }

    constructor() {
        super();
        this.templates = {
        }
    }

    render() {
        if (!this.props.post) {
            return (<p>Loading</p>);
        }
        let Tpl = this.templates[this.props.params.slug] || templates.Default;
        return (<Tpl post={this.props.post}/>)
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
)(FetchData(Post, 'post'));