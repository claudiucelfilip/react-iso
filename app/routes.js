import React from 'react';
import App from './App';
import { NotFound } from './containers/notFound/NotFound';
import Page from './containers/page/Page';
import Post from './containers/post/Post';
import Category from './containers/category/Category';
import { Route, IndexRoute } from 'react-router';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Page}/>
        <Route path="/category" component={Category}/>
        <Route path="/category/:slug" component={Category}/>
        <Route path="/:slug" component={Page}/>
        <Route path="/post/:slug" component={Post}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
