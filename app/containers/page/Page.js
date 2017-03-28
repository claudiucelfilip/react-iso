import React from 'react';
import styles from './style.scss';
import { getPageBySlug } from '../../actions';
import { connect } from 'react-redux';
import * as templates from '../../templates/page';

class Page extends React.Component {

    static fetchData(dispatch, props) {
        return dispatch(getPageBySlug(props.params.slug));
    }

    constructor() {
        super();
        this.templates = {
            'sample-page': templates.Homepage
        };
    }

    componentWillMount() {
        let slug = this.props.params.slug || '';
        if (!this.props.pages[slug]) {
            this.props.dispatch(getPageBySlug(slug));
        }
    }

    render() {
        let page = this.props.pages[this.props.params.slug];
        if (!page) {
            return <p>Loading</p>;
        }
        let Tpl = this.templates[this.props.params.slug] || templates.Default;
        return (<Tpl page={page}/>)
    }
}


function mapStateToProps(state) {
    return {
        pages: state.pages
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
)(Page);
