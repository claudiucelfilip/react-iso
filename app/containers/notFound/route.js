const React = require('react');
const {NotFound} = require('./NotFound');
const {Route} =  require('react-router');

export default () => <Route path="*" component={NotFound} />;