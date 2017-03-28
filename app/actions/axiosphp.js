import axios from 'axios';

class Axios {
    get (url) {
        if (typeof PHP !== 'undefined' && PHP.reactIso1) {
            return new Promise((resolve, reject) => {
                try {
                    let data = JSON.parse(PHP.reactIso1.__call('get', [url]));
                    resolve({data});
                } catch (e) {
                    reject(e);
                }
            });
        } else {
            return axios.get(url);
        }
    }
}
export default new Axios();
