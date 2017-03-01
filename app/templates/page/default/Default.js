import React from 'react';
import styles from './styles.scss';
import RawHtml from 'react-raw-html';

export class Default extends React.Component {
    render() {
        let page = this.props.page;
        return (

            <div className="container">
                <h1>{page.title.rendered}</h1>
                <RawHtml.div>
                    {page.content.rendered}
                </RawHtml.div>
            </div>
        );
    }
}
