import axios from 'axios';
import { apiUrl } from '../constants';

const request = axios.create({
    baseURL: 'http://192.168.1.6:8889/api/',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
});

export default request;
