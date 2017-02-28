import React from 'react';
import styles from './style.scss';
import {getPageBySlug, resetPage} from '../../actions';
import {connect} from 'react-redux';
import * as templates from '../../templates/page';
import {FetchData}from '../fetchData/FetchData';
import {withRouter} from 'react-router';

export class Page extends React.Component {
    static fetchData(dispatch, props) {
        return dispatch(getPageBySlug(props.params.slug));
    }


    constructor() {
        super();
        this.templates = {
            'about': templates.About,
            'contact': templates.Contact,
            'test': templates.Test
        };

        this.state = {
            page: undefined
        }
    }

    componentWillMount() {
        if (!this.state.page) {
            Page.fetchData(this.props.dispatch, this.props);
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