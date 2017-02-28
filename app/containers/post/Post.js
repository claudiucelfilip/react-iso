import React from 'react';
import styles from './style.scss';
import {getPostBySlug, resetPost} from '../../actions';
import {connect} from 'react-redux';
import * as templates from '../../templates/post';
import {FetchData}from '../fetchData/FetchData';
import {withRouter} from 'react-router';

export class Post extends React.Component {
    static fetchData(dispatch, props) {
        return dispatch(getPostBySlug(props.params.slug));
    }


    constructor() {
        super();
        this.templates = {
            'about': templates.About,
            'contact': templates.Contact,
            'test': templates.Test
        };

        this.state = {
            post: undefined
        }
    }

    componentWillMount() {
        if (!this.state.post) {
            Post.fetchData(this.props.dispatch, this.props);
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