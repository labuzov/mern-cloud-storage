import axios from 'axios';

// const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'http://localhost:5000/api/files',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Access-Control-Allow-Credentials': 'true',
//     }
// })

const URL = 'http://localhost:5000/api/files';

const fileApi = {
    getFiles(dirId) {
        const token = localStorage.getItem('token');

        return axios.get(URL + (dirId ? '?parent=' + dirId : ''), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    createDir(dirId, name) {
        const token = localStorage.getItem('token');
        
        return axios.post(URL, {
            name,
            type: 'dir',
            parent: dirId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

}

export default fileApi