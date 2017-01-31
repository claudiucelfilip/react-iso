const routes = require('./routes');
const React = require('react');
const {render} = require('react-dom');
const {Router, browserHistory} = require('react-router');

render(<Router routes={routes} history={browserHistory} />, document.getElementById('root'));