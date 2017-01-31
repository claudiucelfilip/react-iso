const React = require('react');
const Home = require('./home');
const About = require('./about');
const {Router, Route, browserHistory, Link} =  require('react-router');

module.exports = (
    <Route>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Route>
);