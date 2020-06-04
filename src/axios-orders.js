import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgur-app.firebaseio.com/'
});

export default instance;