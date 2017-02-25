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
            <div className={
                    cx(styles.circleContainer,{
                        [styles.loading]: this.props.loading
                    })
                }>
                {this.props.children}
            </div>
        )
    }
}