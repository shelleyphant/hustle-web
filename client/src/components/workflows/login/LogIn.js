import React from 'react'
import TextInput from '../../UI/TextInput'
import Button from '../../UI/Button'
import * as Icon from '@tabler/icons'


const LogIn = () => {
    return (
        <>
            <h1>Welcome Back!</h1>

            <form>
                <div>
                    <label name='username'><Icon.IconUser /></label>
                    <TextInput name='username' id='username' placeholder='username' />
                </div>
                <div>
                    <label name='password'><Icon.IconLock /></label>
                    <TextInput name='password' id='password' placeholder='password' type='password' />
                </div>
                <Button name='log in' type='submit' text='login' display='main' />
            </form>
        </>
    )
}

export default LogIn
