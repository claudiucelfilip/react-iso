const React = require('react');
const About = require('./About');
const {Route} =  require('react-router');

module.exports = () => <Route path="/about" component={About} />;