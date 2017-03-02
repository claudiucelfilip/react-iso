import axios from 'axios';
import API from '../constants/api';
export const GET_PAGES = 'get_pages';
export const GET_PAGE_BY_ID = 'get_page_by_id';
export const GET_PAGE_BY_SLUG = 'get_page_by_slug';
export const RESET_PAGE = 'reset_page';

export const getPages = () => {
    return {
        type: GET_PAGES,
        payload: axios.get(API.baseUrl + 'pages')
            .then(response => {
                return response.data;
            })
    };
};

export const resetPage = (slug) => {
    return {
        type: RESET_PAGE,
        payload: {slug}
    };
};

export const getPageById = (id) => {
    return {
        type: GET_PAGE_BY_ID,
        payload: axios.get(API.baseUrl + `pages/${id}`)
            .then(response => ({slug: id, data: response.data}))
    };
};

export const getPageBySlug = (slug) => {

    return {
        type: GET_PAGE_BY_SLUG,
        payload: axios.get(API.reactIso1Url + `pages/${slug || ''}`)
            .then(response => {
                return response.data[0] || response.data;
            })
            .then(data => ({slug, data}))
    };
};
