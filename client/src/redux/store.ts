import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'

const store = configureStore({
    reducer: {user: userSlice},
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store