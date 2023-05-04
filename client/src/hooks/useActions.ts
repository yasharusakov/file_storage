import {useAppDispatch} from './useAppDispatch'
import {bindActionCreators} from 'redux'
import * as UserActionCreators from '../redux/userSlice'

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(
        {...UserActionCreators},
        dispatch
    )
}