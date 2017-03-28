import React from 'react';
import styles from './style.scss';
import cx from 'classnames';
import Rx from 'rxjs/Rx';

export class RotatingLevel extends React.Component {
    static rotation;
    constructor() {
        super();
        this.levels = {
            'main': 0,
            'sec1': -1,
            'sec2': -3,
            'h1': 3,
            'p': 1
        };

        this.state = {
            rotation: 0
        }
    }

    componentWillMount() {
        this.subscription = RotatingLevel.rotation.subscribe((rotation) => {
            this.setState({rotation});
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    componentDidMount() {
        RotatingLevel.rotation = new Rx.BehaviorSubject(-30);
    }

    render () {
        let style = {
            transform: `rotateY(${this.state.rotation}deg)`
        };

        let className = this.props.className;
        return (
            <div style={style} className={className}>
                {this.props.children}
            </div>
        )
    }
}
