import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Components/Login'
import PageNotFound from './Components/PageNotFound'
import MainPage from './Components/MainPage'
import "@fontsource/ibm-plex-sans"


export default function App(){
    return(
        <Router>
            <Routes>
                <Route path = '/' element = {<Login/>} ></Route>
                <Route path = '/mainPage' element = {<MainPage/>} ></Route>
                <Route path = '*' element = {<PageNotFound/>}></Route>
            </Routes>
        </Router> 
    )
}