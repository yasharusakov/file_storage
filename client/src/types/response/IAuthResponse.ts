import {IUser} from '../IUser'

export interface IAuthResponse {
    accessToken: string
    user: IUser
}