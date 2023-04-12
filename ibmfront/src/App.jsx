import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './Components/HomePage'
import PageNotFound from './Components/PageNotFound'


export default function App(){
    return(
        <Router>
            <Routes>
                <Route path = '/' element = {<HomePage/>} ></Route>
                <Route path = '*' element = {<PageNotFound/>}></Route>
            </Routes>
        </Router> 
    )
}