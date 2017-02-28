import React from 'react';
import styles from './styles.scss';
import RawHtml from 'react-raw-html';

export class About extends React.Component {
    render () {
        let page = this.props.page;
        return (
            <article className="container">
                <h1>{page.title.rendered}</h1>
                <RawHtml.div>
                    {page.content.rendered}
                </RawHtml.div>
            </article>
        );
    }
}