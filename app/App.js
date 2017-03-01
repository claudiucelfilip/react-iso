import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './styles/main.scss';
import Navigation from './containers/navigation/Navigation';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group'


export default class App extends React.Component {
    static fetchData(dispatch, props) {
        return Navigation.fetchData(dispatch, props);
    }

    render() {
        let segment = this.props.location.key;
        return (
            <main>
                <header className="header">
                    <Navigation slug="main-menu" {...this.props}/>
                    <img src="/favicon.ico" className="logo"/>
                </header>
                <secion>
                    <ReactCSSTransitionGroup transitionName="pageSlider"
                                             transitionEnterTimeout={500}
                                             transitionLeaveTimeout={500}>
                        <article className="page" key={segment}>
                            {this.props.children}
                        </article>
                    </ReactCSSTransitionGroup>
                </secion>
                <footer className="container">
                    <p>© 2016 Company, Inc.</p>
                </footer>
            </main>
        );
    }
}
