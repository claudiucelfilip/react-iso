import { GET_PAGES,
    GET_PAGE_BY_ID,
    GET_PAGE_BY_SLUG
} from '../actions';

const initialState = {
    list: [],
    current: undefined
};

export const pagesReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
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