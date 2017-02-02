const React = require('react');
const NotFound = require('./NotFound');
const {Route} =  require('react-router');

module.exports = () => <Route path="*" component={NotFound} />;