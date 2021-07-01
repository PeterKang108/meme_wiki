import axios from 'axios'

const axios_user = axios.create({
    timeout: 500000,
    baseURL: 'http://8.141.64.134:8889/'
    // baseURL: 'http://0.0.0.0:8889/'
})


export default axios_user