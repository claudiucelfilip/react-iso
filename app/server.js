const React = require('react');
const {renderToString} = require('react-dom/server');
const {match, RouterContext} = require('react-router');
const routes = require('./routes');


module.exports = function *() {
    return new Promise((resolve, reject) => {
        match({routes, location: this.request.url}, (error, redirectLocation, renderProps) => {
            let content = renderToString(<RouterContext {...renderProps}/>);
            resolve(content);
        });
    });
};
