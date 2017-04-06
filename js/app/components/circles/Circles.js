import React from 'react';
import cx from 'classnames';
import styles from './styles.scss';

export * from './Circle';

export class Circles extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className={styles.circleContainer}>
                {this.props.children}
            </div>
        )
    }
}
