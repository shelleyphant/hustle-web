import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Hot } from './workflows/feeds/Hot'
import { Live } from './workflows/feeds/Live'
import { Main } from './workflows/feeds/Main'

const Home = () => {

    return (
        <>
            <Switch>
                <Route path='/live' exact component={Live} />
                <Route path='/hot' exact component={Hot}/>
                <Route path='/' exact component={Main} />
            </Switch>
        </>
    )
}

export default Home
