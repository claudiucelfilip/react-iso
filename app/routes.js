const React = require('react');
const App = require('./App');
const HomeRoute = require('./components/home/route');
const AboutRoute = require('./components/about/route');
const NotFoundRoute = require('./components/notFound/route');
const {Route} =  require('react-router');

export const routes = (
    <Route path="/" component={App}>
        {HomeRoute()}
        {AboutRoute()}
        {NotFoundRoute()}
    </Route>
);