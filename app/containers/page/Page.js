import React from 'react';
import styles from './style.scss';
import {getPageBySlug} from '../../actions';
import {connect} from 'react-redux';
import * as templates from '../../templates/page';
import {FetchData}from '../fetchData/FetchData';

export class Page extends React.Component {
    static fetchData(dispatch, props) {
        return dispatch(getPageBySlug(props.params.slug));
    }

    constructor() {
        super();
        this.templates = {
            'about': templates.About,
            'contact': templates.Contact
        }
    }

    render() {
        let Tpl = this.templates[this.props.params.slug] || templates.Default;
        return (<Tpl page={this.props.page}/>)
    }
}


function mapStateToProps(state) {
    return {
        page: state.pages.current
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
)(FetchData(Page, 'page'));