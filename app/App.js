import React, {PropTypes} from 'react';
import {getPages, getMenus} from './actions';
import './styles/main.scss';
import {connect} from 'react-redux';
import {Navigation} from './components/Navigation/Navigation';

class App extends React.Component {
    static fetchData(dispatch, props) {
        return [
            dispatch(getMenus())
        ];
    }

    render() {
        return (
            <div className="container">
                <Navigation slug="main-menu" {...this.props}/>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {...state};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);