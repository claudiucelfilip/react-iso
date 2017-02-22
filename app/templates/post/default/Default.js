import React from 'react';
import styles from './styles.scss';
import RawHtml from 'react-raw-html';

export class Default extends React.Component {
    render () {
        let post = this.props.post;
        return (
            <section>
                <h1>Default Post</h1>
                <h2>{post.title.rendered}</h2>
            </section>
        );
    }
}