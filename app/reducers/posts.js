import {
    GET_POSTS,
    GET_POST_BY_ID,
    GET_POST_BY_SLUG,
    GET_POSTS_BY_CATEGORY,
    RESET_POST,
    RESET_POSTS
} from '../actions';

const initialState = {
    list: [],
    current: undefined
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_POST:
            return Object.assign({}, state, {
                current: initialState.current
            });
        case RESET_POSTS:
            return Object.assign({}, state, {
                list: initialState.list
            });
        case GET_POSTS_BY_CATEGORY + '_FULFILLED':
        case GET_POSTS + '_FULFILLED':
            return Object.assign({}, state, {
                list: action.payload
            });
        case GET_POST_BY_SLUG + '_FULFILLED':
        case GET_POST_BY_ID + '_FULFILLED':
            return Object.assign({}, state, {
                current: action.payload
            });
        default:
            return state;
    }
};
