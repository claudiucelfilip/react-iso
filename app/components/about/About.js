import React from 'react';
import { Link } from 'react-router';
import styles from './style.scss';

export class About extends React.Component {
    render () {
        return (
            <div>
                <h1>About</h1>
                <Link to="/">
                    <button className={styles.button}>
                        Home
                    </button>
                </Link>
                <br />
                <a onClick={this.props.getPosts}>Get Posts</a>
                <ul>
                    {this.props.posts.map((post, index) => (
                        <li key={index}>{post.title.rendered}</li>
                    ))}
                </ul>
            </div>
        );
    }
}