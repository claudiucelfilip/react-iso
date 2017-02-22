import React from 'react';

export const FetchData = (Component, type) => class extends React.Component {

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

    render() {
        if (!this.props[type]) {
            return (<p>Loading...</p>);
        }
        return (<Component {...this.props}/>);
    }
};
