import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LogIn from '../src/components/workflows/login/LogIn'
import SignUp from '../src/components/workflows/login/SignUp'
import Home from '../src/components/Home'
// import Layout from './components/Layout';
import { Navigation } from './components/Navigation';

import './App.css'

const App = () => {

    const [auth, setAuth] = useState({
        auth: false
    })
    const checkAuth = async () => {
        const response = await fetch('http://localhost:5000/auth', {
            method: 'GET',
            credentials: 'include'
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setAuth({auth: data.auth})
    }
    useEffect(() => {checkAuth()}, [])

    return(
        <Router>
            <Navigation />
            <Switch>
                {/* <Route path='/' exact component={Home}/> */}
                <Route path='/login' exact component={LogIn} />
                <Route path='/register' exact component={SignUp} />
            </Switch>
            <Home />
        </Router>
    )
}

export default App