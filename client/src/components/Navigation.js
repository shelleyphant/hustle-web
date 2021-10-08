import React, { useState, useEffect } from 'react'
import * as Icon from '@tabler/icons'
import { Link } from 'react-router-dom'

import './styles/navigation.scss'

export const Navigation = () => {
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

    return (
        <div className='navigation'>
            <ul>
                <li><Link to='/' ><Icon.IconHome /></Link></li>
                <li><Link to='/' ><Icon.IconSearch /></Link></li>
                <li><Link to='/' ><Icon.IconMail /></Link></li>
                <li><Link to='/' ><Icon.IconBell /></Link></li>
                <li><Link to='/' ><Icon.IconChevronDown /></Link></li>
            </ul>
            
        </div>
    )
}
