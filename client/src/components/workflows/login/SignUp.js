import React from 'react'
import { useState, useEffect } from 'react'
import TextInput from '../../UI/TextInput'
import Button from '../../UI/Button'
import * as Icon from '@tabler/icons'
import {Redirect} from 'react-router-dom'

const SignUp = () => {

    const canRegister = async () => {
        await fetch('http://localhost:5000/auth/register', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(res => res.message ? console.log('can sign up') : <Redirect  to='/login' />)
    }
    useEffect(canRegister)

    const [ user, setUser ] = useState({
        username: '',
        email: '',
        password: ''
    })

    const inputHandler = (e) =>{
        setUser( {...user, [e.target.name]: e.target.value} )
    }

    const addUser = async (e) => {
        e.preventDefault()
        console.log(user)
        await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json',
            }
        })
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
