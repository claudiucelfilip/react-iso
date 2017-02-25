import React, {PropTypes} from 'react';
import {getPages, getMenus} from './actions';
import './styles/main.scss';
import {connect} from 'react-redux';
import {Navigation} from './components/Navigation/Navigation';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group'


class App extends React.Component {
    static fetchData(dispatch, props) {
        return [
            dispatch(getMenus())
        ];
    }

    render() {
        let segment = this.props.location.pathname;
        return (
            <div>
                <div className="header">
                    <Navigation slug="main-menu" {...this.props}/>
                    <img src="/favicon.ico" className="logo"/>
                </div>
                <div className="container">
                    <ReactCSSTransitionGroup transitionName="pageSlider"
                                             className="page"
                                             transitionEnterTimeout={500}
                                             transitionLeaveTimeout={500}>
                        {React.cloneElement(this.props.children, {key: segment})}
                    </ReactCSSTransitionGroup>
                </div>
                <footer className="container">
                    <p>© 2016 Company, Inc.</p>
                </footer>
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