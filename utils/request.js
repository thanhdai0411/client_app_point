import axios from 'axios';
import { apiUrl } from '../constants';

const request = axios.create({
    baseURL: 'https://awaco.herokuapp.com/api/',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
});

export default request;
