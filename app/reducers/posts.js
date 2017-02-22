import { GET_POSTS,
    GET_POST_BY_ID,
    GET_POST_BY_SLUG,
    GET_POSTS_BY_CATEGORY
} from '../actions';

const initialState = {
    list: [],
    current: undefined
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
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