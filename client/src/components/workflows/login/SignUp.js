import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import TextInput from '../../UI/TextInput'
import Button from '../../UI/Button'
import * as Icon from '@tabler/icons'

const SignUp = () => {

    const [direct, setDirect] = useState({
        redirect: false,
        url: ''
    })
    const [ user, setUser ] = useState({
        username: '',
        email: '',
        password: ''
    })

    const checkAuth = async () => {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setDirect({redirect: true, url: data.redirect})
    }

    useEffect(checkAuth)
    if(direct.redirect){ return <Redirect to={direct.url} /> }

    const addUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/auth/register', {
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
            <h1>Welcome New User!</h1>

            <form onSubmit={addUser}>
                <div>
                    <label name='username'><Icon.IconUser /></label>
                    <TextInput name='username' id='username' placeholder='username' onChange={inputHandler} value={user.username}/>
                </div>
                <div>
                    <label name='email'><Icon.IconMail /></label>
                    <TextInput name='email' id='email' placeholder='email' onChange={inputHandler} value={user.email}/>
                </div>
                <div>
                    <label name='password'><Icon.IconLock /></label>
                    <TextInput name='password' id='password' placeholder='password' type='password' onChange={inputHandler} value={user.password} />
                </div>
                <Button name='sign up' type='submit' text='sign up' display='main' />
            </form>
        </>
    )
}

export default SignUp
