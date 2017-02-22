import { GET_MENUS,
    GET_MENU_BY_ID,
    GET_MENU_BY_SLUG
} from '../actions';

const initialState = {
    list: [],
    'main-menu': {}
};

export const menusReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MENUS + '_FULFILLED':
        case GET_MENU_BY_SLUG + '_FULFILLED':
        case GET_MENU_BY_ID + '_FULFILLED':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};