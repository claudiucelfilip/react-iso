import React from 'react';
import styles from './styles.scss';
import RawHtml from 'react-raw-html';

export class Test extends React.Component {
    constructor() {
        super();
    }

    render() {
        let page = this.props.page;
        return (
            <section>
                <h2>{page.title.rendered}</h2>
                <RawHtml.div>
                    {page.content.rendered}
                </RawHtml.div>
            </section>
        );
    }
}