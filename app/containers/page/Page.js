import React from 'react';
import styles from './style.scss';
import {getPageBySlug, resetPage} from '../../actions';
import {connect} from 'react-redux';
import * as templates from '../../templates/page';
import {FetchData}from '../fetchData/FetchData';
import {withRouter} from 'react-router';

export class Page extends React.Component {
    static serverData;
    static fetchData(dispatch, props) {
        return dispatch(getPageBySlug(props.params.slug))
            .then(result => {
                Page.serverData = result.value;
            });
    }

    constructor() {
        super();
        this.templates = {};

        this.state = {
            page: Page.serverData
        };

        Page.serverData = null;
    }

    componentWillMount() {
        if (!this.state.page) {
            this.props.dispatch(getPageBySlug(this.props.params.slug));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.page) {
            this.setState({
                page: nextProps.page
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetPage());
    }

    render() {

        if (!this.state.page) {
            return <p>Loading</p>;
        }
        let Tpl = this.templates[this.props.params.slug] || templates.Default;
        return (<Tpl page={this.state.page}/>)
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
)(Page);
