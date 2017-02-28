import axios from 'axios';
import API from '../constants/api';
export const GET_POSTS = 'get_posts';
export const GET_POST_BY_ID = 'get_post_by_id';
export const GET_POST_BY_SLUG = 'get_post_by_slug';
export const GET_POSTS_BY_CATEGORY = 'get_post_by_category';
export const RESET_POST = 'reset_post';
export const RESET_POSTS = 'reset_posts';

export const getPosts = () => {
    return {
        type: GET_POSTS,
        payload: axios.get(API.baseUrl + 'posts')
            .then(response => {
                return response.data;
            })
    }
};

export const resetPost = () => {
    return {
        type: RESET_POST
    }
};

export const resetPosts = () => {
    return {
        type: RESET_POSTS
    }
};

export const getPostsByCategory = (categorySlug) => {
    console.log(API.reactIso1Url + `posts/${categorySlug}`);
    return {
        type: GET_POSTS_BY_CATEGORY,
        payload: axios.get(API.reactIso1Url + `posts/${categorySlug}`)
            .then(response => {
                return response.data;
            })
    }
};

export const getPostById = (id) => {
    return {
        type: GET_POST_BY_ID,
        payload: axios.get(API.baseUrl + `posts/${id}`)
            .then(response => {
                return response.data;
            })
    }
};

export const getPostBySlug = (slug) => {
    return {
        type: GET_POST_BY_SLUG,
        payload: axios.get(API.baseUrl + `posts?slug=${slug}`)
            .then(response => {
                return response.data[0] || response.data;
            })
    }
};