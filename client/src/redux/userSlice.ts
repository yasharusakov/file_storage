import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {IUser} from '../types/IUser'
import {IAuthResponse} from '../types/response/IAuthResponse'
import AuthService from '../services/AuthService'
import axios from 'axios'

interface IUserState {
    user: IUser
    isAuth: boolean
    isLoading: boolean
}

interface IUserAuth {
    email: string
    password: string
}

const initialState: IUserState = {} as IUserState

export const login = createAsyncThunk(
    'user/login',
    async (user: IUserAuth) => {
        const response = await AuthService.login(user.email, user.password)
        localStorage.setItem('token', response.data.accessToken)
        return response.data.user
    }
)

export const registration = createAsyncThunk(
    'user/registration',
    async (user: IUserAuth) => {
        const response = await AuthService.registration(user.email, user.password)
        localStorage.setItem('token', response.data.accessToken)
        return response.data.user
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        await AuthService.logout()
        localStorage.removeItem('token')
    }
)

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async () => {
        const response = await axios.get<IAuthResponse>(`${import.meta.env.VITE_API_URL}/auth/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken)
        return response.data.user
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload
        })
        builder.addCase(registration.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isAuth = false
            state.user = {} as IUser
        })
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload
            state.isLoading = false
        })
        builder.addCase(checkAuth.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default userSlice.reducer