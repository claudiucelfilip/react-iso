import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import styles from './style.scss';
import {FetchData}from '../fetchData/FetchData';
import {getPostsByCategory} from '../../actions';

export class Category extends React.Component {
    static fetchData(dispatch, props) {
        return dispatch(getPostsByCategory(props.params.slug));
    }

    render() {
        return (
            <main className={styles.container}>
                <h1>Posts</h1>
                <ul>
                    {this.props.posts.map((post, index) => (
                        <li key={index}>
                            <h2>{post.title.rendered}</h2>
                            <Link to={`/${post.slug}`}>
                                read
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts.list
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
)(FetchData(Category, 'posts'));




