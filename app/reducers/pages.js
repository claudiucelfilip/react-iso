import {
    GET_PAGES,
    GET_PAGE_BY_ID,
    GET_PAGE_BY_SLUG,
    RESET_PAGE
} from '../actions';

const initialState = {

};

export const pagesReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case RESET_PAGE:
            return Object.assign({}, state, {
                [action.payload.slug]: undefined
            });
        case GET_PAGES + '_FULFILLED':
            return action.payload;
        case GET_PAGE_BY_SLUG + '_FULFILLED':
        case GET_PAGE_BY_ID + '_FULFILLED':
            return Object.assign({}, state, {
                [action.payload.slug]: action.payload.data
            });
        default:
            return state;
    }
};
