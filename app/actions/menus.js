import axios from 'axios';
import API from '../constants/api';
export const GET_MENUS = 'get_menus';
export const GET_MENU_BY_ID = 'get_menu_by_id';
export const GET_MENU_BY_SLUG = 'get_menu_by_slug';

export const getMenus = () => {
    return {
        type: GET_MENUS,
        payload: axios.get(API.reactIso1Url + 'menus')
            .then(response => {
                return response.data;
            })
    }
};

export const getMenuById = (id) => {
    return {
        type: GET_MENU_BY_ID,
        payload: axios.get(API.reactIso1Url + `menus/${id}`)
            .then(response => {
                return {[id]: response.data};
            })
    }
};


export const getMenuBySlug = (slug) => {
    return {
        type: GET_MENU_BY_SLUG,
        payload: axios.get(API.baseUrl + `menus?slug=${slug}`)
            .then(response => {
                let data = response.data[0] || response.data;
                return {[slug]: data}
            })
    }
};