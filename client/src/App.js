import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LogIn from '../src/components/workflows/login/LogIn'
import SignUp from '../src/components/workflows/login/SignUp'

import './App.css'

const App = () => {

    return(
        <Router>
            <Switch>
                <Route path='/login' exact component={LogIn} />
                <Route path='/register' exact component={SignUp} />
                <Route path='/' exact component={Home}/>
            </Switch>
        </Router>
    )
}

export default App

export const Home = () => {
    return <h1>Homepage</h1>
}
