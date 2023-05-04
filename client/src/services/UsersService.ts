import $api from '../http'
import {AxiosResponse} from 'axios'
import {IUser} from '../types/IUser'

export default class UsersService {

    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('users')
    }

    static async uploadFiles(data: any): Promise<AxiosResponse<any>> {
        const formData = new FormData()
        for (let i = 0; i < data.files.length; i++) {
            formData.append('files', data.files[i])
        }
        formData.append('userId', data.userId)
        return $api.post<any>('files/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    }

    static async getFiles(userId: string): Promise<AxiosResponse<any>> {
        return $api.post<any>('files', {userId})
    }
}