import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

const Home = () => {

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
    // if(direct.redirect){ return <Redirect to={direct.url} /> }

    return (
        <div>
            <h1>Homepage</h1>
        </div>
    )
}

export default Home
