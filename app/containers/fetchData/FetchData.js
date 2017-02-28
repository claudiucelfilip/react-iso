import React from 'react';
import {connect} from 'react-redux';
import {Circles, Circle} from '../../components/circles/Circles';
import {withRouter} from 'react-router';

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export const FetchData = (Component, type, mapStateToProps) => {
    let FetchDataComponent = class extends React.Component {

        static fetchData(dispatch, props) {
            return Component.fetchData(dispatch, props);
        }

        static resetData(dispatch) {
            return Component.resetData(dispatch);
        }

        constructor() {
            super();

            this.state = {
                [type]: undefined
            }
        }

        componentWillMount() {
            Component.resetData(this.props.dispatch);
        }

        componentDidMount() {
            if (!this.state[type]) {
                Component.fetchData(this.props.dispatch, this.props);
            }
        }

        componentWillReceiveProps(nextProps) {
            if (!this.state[type] && nextProps[type]) {
                this.setState({
                    [type]: Object.assign({}, nextProps[type])
                });
            }
        }

        render() {
            if (!this.state[type]) {
                return (<p>Loading</p>);
            }

            return (
                <div className="container">
                    <Component {...this.props} data={this.state[type]}/>
                </div>
            );
        }
    };

    return withRouter(connect(
        mapStateToProps,
        mapDispatchToProps
    )(FetchDataComponent));
};
