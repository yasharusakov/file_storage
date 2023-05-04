import {FormEvent, useState} from 'react'
import {useActions} from '../../hooks/useActions.ts'
import './style.scss'

const AuthPage = () => {
    const {login, registration} = useActions()
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (isLogin) {
            return login({email, password})
        }
        return registration({email, password})
    }

    return (
        <div className="auth-page">
            <div className="auth-page__container">
                <form onSubmit={onSubmitHandler} className="auth-page__form">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        className="auth-page__form__input"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="auth-page__form__input"
                    />
                    <button
                        type="submit"
                        className="auth-page__form__submit"
                    >
                        {isLogin ? 'Sign in' : 'Sign up'}
                    </button>
                </form>
                <button onClick={() => setIsLogin(isLogin => !isLogin)}>
                    Switch to {isLogin ? 'Sign up' : 'Sign in'}
                </button>
            </div>
        </div>
    )
}

export default AuthPage