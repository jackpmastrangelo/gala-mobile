import axios from 'axios';

export let galaAxios = axios.create({ baseURL: "http://localhost:8080" });