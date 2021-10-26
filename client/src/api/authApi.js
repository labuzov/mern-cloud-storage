import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/auth',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
    }
})

const authApi = {
    login(email, password) {
        // return instance.get('/login')
        return instance.post('/login', {email, password})
    },

    register(email, password) {
        return instance.post('/registration', {email, password})
    },

    auth() {
        const token = localStorage.getItem('token');
        
        return instance.get('/', {headers: {Authorization: `Bearer ${token}`}})
    }
}

export default authApi