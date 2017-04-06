import {postsReducer} from './posts';
import {pagesReducer} from './pages';
import {menusReducer} from './menus';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

export const appReducer = combineReducers({
    posts: postsReducer,
    pages: pagesReducer,
    menus: menusReducer,
    routing: routerReducer
});