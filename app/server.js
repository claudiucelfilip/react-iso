import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {routes} from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { appReducer } from './reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

let store = createStore(
    appReducer,
    applyMiddleware(
        thunkMiddleware,
        promiseMiddleware()
    )
);

function *run() {
    return new Promise((resolve, reject) => {
        match({
            routes,
            location: this.request.url
        }, (error, redirectLocation, renderProps) => {
            let promises = renderProps.components
                .filter(component => {
                    return component.fetchData
                })
                .map((component) => {
                    let promise = component.fetchData(store.dispatch, renderProps);
                    if (promise.length) {
                        return Promise.all(promise);
                    }
                    return promise;
                });

            resolve(
                Promise
                    .all(promises)
                    .then(() => renderProps)
            );
        });
    });
}

module.exports = function *() {
    let renderProps = yield run.call(this);
    let content = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps}/>
        </Provider>
    );
    return {
        content,
        initialState: JSON.stringify(store.getState())
    };
};
