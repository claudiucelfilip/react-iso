import { GET_POSTS } from '../actions';

const initialState = [{
    title: 'curtea'
}];

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS + '_FULFILLED':
            return action.payload;
        default:
            return state;
    }
};