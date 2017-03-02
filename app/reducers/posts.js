import {
    GET_POSTS,
    GET_POST_BY_ID,
    GET_POST_BY_SLUG,
    GET_POSTS_BY_CATEGORY,
    RESET_POST,
    RESET_POSTS
} from '../actions';

const initialState = {

};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_POST:
            return Object.assign({}, state, {
                [action.payload.slug]: undefined
            });
        case RESET_POSTS:
            return initialState;
        case GET_POSTS_BY_CATEGORY + '_FULFILLED':
        case GET_POSTS + '_FULFILLED':
            return action.payload;
        case GET_POST_BY_SLUG + '_FULFILLED':
        case GET_POST_BY_ID + '_FULFILLED':
            return Object.assign({}, state, {
                [action.payload.slug]: action.payload.data
            });
        default:
            return state;
    }
};
