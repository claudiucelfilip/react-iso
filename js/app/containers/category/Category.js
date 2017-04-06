import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './style.scss';
import { FetchData }from '../fetchData/FetchData';
import { getPostsByCategory, resetPosts } from '../../actions';

export class Category extends React.Component {
    static serverData;
    static fetchData(dispatch, props) {
        return dispatch(getPostsByCategory(props.params.slug))
            .then(result => {
                Category.serverData = result.value;
            });
    }

    constructor() {
        super();
        this.state = {
            posts: Category.serverData
        };

        Category.serverData = null;
    }

    componentWillMount() {
        if (!this.state.posts) {
            this.props.dispatch(getPostsByCategory(this.props.params.slug));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.posts) {
            this.setState({
                posts: nextProps.posts
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetPosts());
    }

    render() {
        if (!this.state.posts) {
            return <p>Loading</p>;
        }
        return (
            <article className="container">
                <h1>Posts</h1>
                <ul>
                    {this.state.posts.map((post, index) => (
                        <li key={index}>
                            <h2>{post.title.rendered}</h2>
                            <Link to={`/${post.slug}`}>
                                read
                            </Link>
                        </li>
                    ))}
                </ul>
            </article>
        );
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
)(Category);




