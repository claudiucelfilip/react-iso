import React from 'react';
import {Circles, Circle} from '../../components/circles/Circles';

export const FetchData = (Component, type) => class extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            Component.fetchData(nextProps.dispatch, nextProps);
            return false;
        }

        return true;
    }

    componentDidMount() {
        if (!this.props[type]) {
            Component.fetchData(this.props.dispatch, this.props);
        }
    }

    componentWillReceiveProps() {

    }

    componentDidUpdate() {
        this.state.loading = false;
        setTimeout(() => {
            this.state.loading = true;
        }, 1000);
    }

    render() {
        if (!this.props[type]) {
            return (<p>Loading</p>);
        }
        return (
            <Component {...this.props}/>
        );
    }
};
