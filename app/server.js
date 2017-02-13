const React = require('react');
const {renderToString} = require('react-dom/server');
import {match, RouterContext} from 'react-router';
import {routes} from './routes';


module.exports = function *() {
    return new Promise((resolve, reject) => {
        match({routes, location: this.request.url}, (error, redirectLocation, renderProps) => {
            let content = renderToString(<RouterContext {...renderProps}/>);
            resolve(content);
        });
    });
};
