import React, { useState, useEffect } from 'react'
import * as Icon from '@tabler/icons'
import { Link, useRouteMatch } from 'react-router-dom'

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
            <div className='nav-wrapper'>

                {/* LOGO */}
                <div className='nav-logo'></div>

                <ul className='feed-links'>
                    <StyledFeedLink to='/live' onExact label='Live' />
                    <StyledFeedLink to='/' onExact label='Home' />
                    <StyledFeedLink to='/hot' onExact label='Hot' />
                </ul>

                {/* SEARCH BOX */}

                {auth.auth ? <UserNav /> : <StrangerNav />}
            </div>
        </div>
    )
}

const StyledFeedLink = ({ label, to, onExact }) => {
    let match = useRouteMatch({
      path: to,
      exact: onExact
    })
    return (
      <li className={match ? "active" : ""}>
        <Link to={to}>{label}</Link>
      </li>
    )
  }

const UserNav = () => {
    return (
        <ul className='user-links'>
            <li><Link to='/' ><Icon.IconMessages /></Link></li>
            <li><Link to='/' >Trending</Link></li>
            <li><Link to='/' >Username <Icon.IconChevronDown /></Link></li>
        </ul>
    )
}

const StrangerNav = () => {
    return (
        <ul className='user-links'>
            <li><Link to='/register' className='button alt'><Icon.IconUserPlus /> Sign Up</Link></li>
            <li><Link to='/login' className='button main'><Icon.IconLogin /> Log In</Link></li>
        </ul>
    )
}
