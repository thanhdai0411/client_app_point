import axios from 'axios';
import { apiUrl } from '../constants';

const request = axios.create({
    baseURL: 'http://192.168.1.5:8888/api/',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
});

export default request;
