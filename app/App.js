const React = require('react');

module.exports = class App extends React.Component {
    render() {
        return (<main>{this.props.children}</main>)
    }
};