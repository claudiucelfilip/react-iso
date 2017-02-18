import React from 'react';
import { render } from 'react-dom';
import { routes } from './routes';
import { Router, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { appReducer } from './reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

let store = createStore(
    appReducer,
    INITIAL_STATE,
    applyMiddleware(
        thunkMiddleware,
        promiseMiddleware()
    )
);

render((
        <Provider store={store}>
            <Router routes={routes} history={browserHistory} />
        </Provider>
    ),
    document.getElementById('root')
);