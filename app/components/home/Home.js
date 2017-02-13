const React = require('react');
const {Link} = require('react-router');
import styles from './style.scss';

module.exports = class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            text: 'Home'
        }
    }
    componentDidMount() {
        this.setState({text: 'Client Home'});
    }
    render() {
        return (
            <div className="main_container">
                <h1>{this.state.text}</h1>
                <Link to="/about">
                    <button className={styles.button}>
                        About
                    </button>
                </Link>
            </div>
        );
    }
};
