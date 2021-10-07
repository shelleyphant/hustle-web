import React, { useState } from 'react'
import TextInput from '../../UI/TextInput'
import Button from '../../UI/Button'
import * as Icon from '@tabler/icons'


const LogIn = () => {

    const [ user, setUser ] = useState({
        username: '',
        password: ''
    })

    const inputHandler = (e) =>{
        setUser( {...user, [e.target.name]: e.target.value} )
    }

    const logIn = async (e) => {
        e.preventDefault()
        console.log(user)
        await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json',
            }
        })
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
