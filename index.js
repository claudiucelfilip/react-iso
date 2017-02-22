require('babel-register');
require('babel-polyfill');
require('isomorphic-fetch');

const noop = function () {};

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;

const koa = require('koa');
const ejs = require('koa-ejs');
const serve = require('koa-router-static');
const router = require('koa-router')();
const path = require('path');
const app = koa();

const server = require('./app/server');

ejs(app, {
    root: path.join(__dirname),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

router.get('/public/*', serve('./public'));

router.get(/^\/(?!(public|favicon)).*$/, function *(next) {
    try {
        console.log(this.request.originalUrl);
        let content = yield next;
        yield this.render('index', content);
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.stack;
    }
});


app.use(router.routes());
app.use(server);
app.use(router.allowedMethods());


app.listen(3000);
