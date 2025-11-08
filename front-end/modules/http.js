import axios from 'axios'

const http = (accessToken)=>{
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return axios;
}

export default http