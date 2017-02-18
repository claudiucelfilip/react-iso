const React = require('react');
import App from './App';
const HomeRoute = require('./components/home/route');
import AboutRoute from './components/about/route';
const NotFoundRoute = require('./components/notFound/route');
import {Route} from 'react-router';

export const routes = (
    <Route path="/" component={App}>
        {HomeRoute()}
        {AboutRoute()}
        {NotFoundRoute()}
    </Route>
);