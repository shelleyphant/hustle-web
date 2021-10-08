import React from 'react'

export const Navigation = () => {
    const [direct, setDirect] = useState({
        auth: false,
        url: ''
    })
    const checkAuth = async () => {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'GET',
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setDirect({auth: data.auth, url: data.redirect})
    }

    useEffect(checkAuth)

    return (
        <div>
            
        </div>
    )
}
