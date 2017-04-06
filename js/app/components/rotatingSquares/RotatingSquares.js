import React from 'react';
import styles from './style.scss';
import Rx from 'rxjs/Rx';
import {RotatingLevel} from './RotatingLevel';

export class RotatingSquares extends React.Component {


    constructor() {
        super();
    }
    componentDidMount() {
        let mousePos = Rx.Observable.create((observer) => {
            window.addEventListener('mousemove', (event) => {
                let halfX = window.innerWidth / 2;
                let halfY = window.innerHeight / 2;
                observer.next({
                    x: (event.x - halfX) / halfX,
                    y: (event.y - halfY) / halfY
                });
            });
        });

        this.subscription = mousePos.subscribe(event => {
            RotatingLevel.rotation.next(event.x * 90);
        })
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <article className={styles.RotatingSquaresContainer}>
                <div className={styles.RotatingSquares}>
                    {this.props.children}
                </div>
            </article>
        )
    }
}
