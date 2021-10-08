import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import TextInput from '../../UI/TextInput'
import Button from '../../UI/Button'
import * as Icon from '@tabler/icons'


const LogIn = () => {

    const [direct, setDirect] = useState({
        redirect: false,
        url: ''
    })
    const [ user, setUser ] = useState({
        username: '',
        password: ''
    })

    const checkAuth = async () => {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data.redirect)
        setDirect({redirect: true, url: data.redirect})
    }

    useEffect(checkAuth)
    if(direct.redirect){ return <Redirect to={direct.url} /> }

    const logIn = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json',
            }
        })
        const data = await response.json()
        setDirect({redirect: true, url: data.redirect})
    }

    const inputHandler = (e) =>{
        setUser( {...user, [e.target.name]: e.target.value} )
    }

    return (
        <>
            <h1>Welcome Back!</h1>

            <form onSubmit={logIn}>
                <div>
                    <label name='username'><Icon.IconUser /></label>
                    <TextInput name='username' id='username' placeholder='username' onChange={inputHandler} value={user.username} />
                </div>
                <div>
                    <label name='password'><Icon.IconLock /></label>
                    <TextInput name='password' id='password' placeholder='password' type='password' onChange={inputHandler} value={user.password} />
                </div>
                <Button name='log in' type='submit' text='login' display='main' />
            </form>
        </>
    )
}

export default LogIn
