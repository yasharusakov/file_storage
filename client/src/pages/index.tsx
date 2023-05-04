import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './homePage'
import AuthPage from './authPage'
import {useAppSelector} from '../hooks/useAppSelector.ts'
import {useActions} from '../hooks/useActions.ts'
import {useEffect} from 'react'

const Pages = () => {
    const {checkAuth} = useActions()
    const {isAuth} = useAppSelector(state => state.user)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
    }, [])

    return (
        <Routes>
            {
                isAuth
                    ? <Route path="/" element={<HomePage/>}/>
                    : <Route path="/" element={<AuthPage/>}/>
            }
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default Pages