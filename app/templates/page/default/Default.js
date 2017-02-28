import React from 'react';
import styles from './styles.scss';
import RawHtml from 'react-raw-html';

export class Default extends React.Component {
    render () {
        let page = this.props.page;
        return (
            <article className="container">
                <h1>Default</h1>
                <h2>{page.title.rendered}</h2>
            </article>
        );
    }
}