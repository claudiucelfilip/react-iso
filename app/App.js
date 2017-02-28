import React, {PropTypes} from 'react';
import './styles/main.scss';
import Navigation from './containers/navigation/Navigation';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group'


export default class App extends React.Component {
    static fetchData(dispatch, props) {
        return Navigation.fetchData(dispatch, props);
    }
    render() {
        let segment = this.props.location.pathname;
        return (
            <div>
                <header className="header">
                    <Navigation slug="main-menu" {...this.props}/>
                    <img src="/favicon.ico" className="logo"/>
                </header>
                <main>
                    <ReactCSSTransitionGroup transitionName="pageSlider"
                                             className="page"
                                             transitionEnterTimeout={5000}
                                             transitionLeaveTimeout={5000}>
                        {React.cloneElement(this.props.children, {key: segment})}
                    </ReactCSSTransitionGroup>
                </main>
                <footer className="container">
                    <p>© 2016 Company, Inc.</p>
                </footer>
            </div>
        );
    }
}
