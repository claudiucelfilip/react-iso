import axios from 'axios';
export const GET_POSTS = 'get_posts';

export const getPosts = () => {
    return {
        type: GET_POSTS,
        payload: axios.get('http://localhost/wp-json/wp/v2/posts')
            .then(response => {
                return response.data;
            })
    }
};