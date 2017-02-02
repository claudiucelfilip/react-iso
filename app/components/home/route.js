const React = require('react');
const Home = require('./Home');
const {IndexRoute} =  require('react-router');

module.exports = () => <IndexRoute component={Home} />;