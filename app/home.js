const React = require('react');
const {Link} = require('react-router');

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
            <div>
                <h1>{this.state.text}</h1>
                <Link to="/about">About</Link>
            </div>
        );
    }
};
