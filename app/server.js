const React = require('react');
const {renderToString} = require('react-dom/server');
const {match, RouterContext} = require('react-router');
const Home = require('./home');
const routes = require('./routes');


module.exports = function *() {
    return new Promise((resolve, reject) => {
        match({routes, location: this.request.url}, (error, redirectLocation, renderProps) => {
            if (error) {
                reject(this.throw(error.message, 500));
            } else if (redirectLocation) {
                reject(this.throw(redirectLocation.pathname + redirectLocation.search, 302));
            } else if (renderProps) {
                let content = renderToString(<RouterContext {...renderProps}/>);
                resolve(content);
            } else {
                reject(this.throw('Not Found', 404));
            }
        });
    });
};
