const React = require('react');
import './styles/main.scss';

module.exports = class App extends React.Component {
    render() {
        return (<main className="container">{this.props.children}</main>)
    }
};