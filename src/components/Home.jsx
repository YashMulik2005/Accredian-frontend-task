import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [username, setusername] = useState(localStorage.getItem('username') ? localStorage.getItem('username') : "")
    const navigate = useNavigate()

    const handlelogout = () => {
        localStorage.clear();
        setusername("")
    }

    useEffect(() => {
        if (username == "") {
            navigate("/login")
        }
    }, [username])

    return (
        <div>
            <h1 className=' font-bold'>username:- {username}</h1>
            <Button variant="outlined" size='small' onClick={handlelogout} >Log-out</Button>
        </div>
    )
}

export default Home