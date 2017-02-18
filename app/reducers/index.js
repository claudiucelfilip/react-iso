import { postsReducer } from './posts';
import { combineReducers } from 'redux';

export const appReducer = combineReducers({
    posts: postsReducer
});