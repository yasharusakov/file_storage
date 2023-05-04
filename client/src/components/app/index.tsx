import {BrowserRouter} from 'react-router-dom'
import Pages from '../../pages'
import '../../assets/styles/style.scss'

const App = () => {
    return (
        <BrowserRouter>
            <Pages/>
        </BrowserRouter>
    )
}

export default App