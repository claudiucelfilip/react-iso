const React = require('react');
const {Link} = require('react-router');

module.exports = class About extends React.Component {
    constructor() {
        super();
        this.state = {
            text: 'About'
        }
    }
    componentDidMount() {
        this.setState({text: 'Client About'});
    }
    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
                <Link to="/">Home</Link>
            </div>
        );
    }
};
