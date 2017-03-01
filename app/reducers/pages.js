import {
    GET_PAGES,
    GET_PAGE_BY_ID,
    GET_PAGE_BY_SLUG,
    RESET_PAGE
} from '../actions';

const initialState = {
    list: [],
    current: undefined
};

export const pagesReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case RESET_PAGE:
            return Object.assign({}, state, {
                current: initialState.current
            });
        case GET_PAGES + '_FULFILLED':
            return Object.assign({}, state, {
                list: action.payload
            });
        case GET_PAGE_BY_SLUG + '_FULFILLED':
        case GET_PAGE_BY_ID + '_FULFILLED':
            return Object.assign({}, state, {
                current: action.payload
            });
        default:
            return state;
    }
};
