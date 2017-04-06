import React from 'react';
import cx from 'classnames';
import styles from './styles.scss';

export class Circle extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        let it = [];
        let props = this.props;

        let count = props.power;

        while (count--) {
            it.push('');
        }
        return (
            <div>
                {
                    it.map((_, index) => {
                        return (
                            <div key={index}
                                 className={cx(
                                     styles.circle,
                                     styles[props.position]
                                 )}>
                                <div className={styles.color}
                                     style={{backgroundColor: props.color}}></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}