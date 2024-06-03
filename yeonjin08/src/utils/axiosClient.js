import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Authorization: 'Bearer patodxyOJcG56MLtx.79bdfc5cc4054db05ee89cad210f0a56b4d1e6fcbd3d3e9137c37c37f9cadd47',
    },
})

export default instance
