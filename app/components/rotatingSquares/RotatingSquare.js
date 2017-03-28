import React from 'react';
import {RotatingLevel} from './RotatingLevel';
import styles from './style.scss';
import cx from 'classnames';

export class RotatingSquare extends React.Component {

    render () {
        return (
            <section className={cx(
                styles.RotatingSquare,
                styles[this.props.type]
            )}>
                <RotatingLevel className={styles.SquareBack} level={this.props.type} />
                {
                    this.props.children.map((child, index) => <RotatingLevel key={index} level={child.type}>{child}</RotatingLevel>)
                }
            </section>
        )
    }
}
