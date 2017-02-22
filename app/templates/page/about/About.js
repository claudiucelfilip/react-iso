import React from 'react';
import styles from './styles.scss';
import RawHtml from 'react-raw-html';

export class About extends React.Component {
    render () {
        let page = this.props.page;
        return (
            <section>
                <h1>About</h1>
                <h2>{page.title.rendered}</h2>
            </section>
        );
    }
}