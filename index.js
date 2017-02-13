require('babel-register');
require("babel-polyfill");
const koa = require('koa');
const ejs = require('koa-ejs');
const path = require('path');
const app = koa();
// require('node-jsx').install();

const server = require('./app/server');

ejs(app, {
    root: path.join(__dirname),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

app.use(function *(next) {
    try {
        let content = yield next;
        yield this.render('index', {content});
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
    }
});

app.use(server);
app.listen(3000);
