import axios from 'axios'
import {IAuthResponse} from '../types/response/IAuthResponse'

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL
})


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error?.config
    if (
        error?.response?.status === 401 &&
        error?.config &&
        !error?.config?._isRetry
    ) {
        originalRequest._isRetry = true
        try {
            const response = await axios.post<IAuthResponse>(`${import.meta.env.VITE_API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            originalRequest.headers = {...originalRequest.headers}
            originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Unauthorized')
        }
    }
    throw error
})

export default $api