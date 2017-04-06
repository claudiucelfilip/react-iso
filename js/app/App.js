import React, { PropTypes } from 'react';
import { Circles } from './components/circles/Circles';
import { Circle } from './components/circles/Circle';
import { Link } from 'react-router';
import './styles/main.scss';
import Navigation from './containers/navigation/Navigation';
import Animate from  'rc-animate'


export default class App extends React.Component {
    static fetchData(dispatch, props) {
        return Navigation.fetchData(dispatch, props);
    }

    constructor() {
        super();
    }

    componentDidMount() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }, false);
    }
    render() {
        let segment = this.props.location.key;
        let animation = {
            enter: (node, done) => {
                node.classList.add('pageSlider-enter');
                setTimeout(() => node.classList.add('pageSlider-enter-active'));
                let clear = setTimeout(() => {
                    node.classList.remove('pageSlider-enter', 'pageSlider-enter-active')
                    done();
                }, 1000);
                return {
                    stop: () => {
                        clearTimeout(clear);
                    }
                }
            },
            leave: (node, done) => {
                node.classList.add('pageSlider-leave');
                setTimeout(() => node.classList.add('pageSlider-leave-active'));
                let clear = setTimeout(() => {
                    node.classList.remove('pageSlider-leave', 'pageSlider-leave-active')
                    done();
                }, 1000);
                return {
                    stop: () => {
                        clearTimeout(clear);
                    }
                }
            }
        };
        return (
            <main>
                <header className="header">
                    <Navigation slug="main-menu" {...this.props}/>
                    <img src="/favicon.ico" className="logo"/>
                </header>
                <secion>
                    <Animate
                             component="div"
                             animation={animation}>
                        <article className="page" key={segment}>
                            {this.props.children}
                        </article>
                    </Animate>
                </secion>
                <footer className="container">
                    <p>© 2016 Company, Inc.</p>
                </footer>
            </main>
        );
    }
}
