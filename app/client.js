import React from 'react';
import {render} from 'react-dom';
import {routes} from './routes';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {appReducer} from './reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import {syncHistoryWithStore} from 'react-router-redux'

console.log(INITIAL_STATE);
let store = createStore(
    appReducer,
    INITIAL_STATE,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            promiseMiddleware()
        )
    )
);

const history = syncHistoryWithStore(browserHistory, store);

render((
        <Provider store={store}>
            <Router routes={routes} history={history}/>
        </Provider>
    ),
    document.getElementById('root')
);