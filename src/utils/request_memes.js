import axios from 'axios'

const axios_meme = axios.create({
    timeout: 500000,
    baseURL: 'http://8.141.64.134:8888/'
    // baseURL: 'http://0.0.0.0:8888/'
})


export default axios_meme