import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FaUserCheck } from 'react-icons/fa'
import axios from 'axios'
import { MdCancel } from 'react-icons/md'
import { PulseLoader } from 'react-spinners'

function Signup() {
    const initialdata = {
        username: "",
        email: "",
        password: "",
        confirm: ""
    }
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirm, setconfirm] = useState("")
    const [inputerrors, setinputerrors] = useState(initialdata)
    const [error, seterror] = useState("")
    const [loader, setloader] = useState(false)
    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        // console.log("in function");
        e.preventDefault()
        setloader(true)
        if (username == "") initialdata.username = "*username is required."
        if (email == "") initialdata.email = "*email is required."
        if (password == "") initialdata.password = "*password is required."
        if (confirm == "") initialdata.confirm = "* confirm password is required."

        if (password.length < 8) initialdata.password = "password atleast have 8 charachters."
        if (password != confirm) initialdata.confirm = "password and confirm password should be same."

        setinputerrors(initialdata)

        if (username != "" && email != "" && password != "" && confirm != "" && password == confirm) {
            const res = await axios.post(`https://accredian-backend-task-rho.vercel.app/user/signup`, { username: username, password: password, email: email })
            console.log(res);
            if (res.data.data.success) {
                localStorage.setItem('username', username)
                navigate("/")
            }
            if (res.data.data.error) {
                seterror(res.data.data.error)
            }
            setusername("")
            setemail("")
            setpassword("")
            setconfirm("")
        }
        setloader(false)
    }

    return (
        <div className='h-[75vh] w-[85%] sm:w-[70%] flex rounded shadow-xl'>
            <div className=' hidden min-[875px]:flex bg-[#0fc98a] h-[100%] rounded-l-xl w-[35%] p-4  flex-col justify-center items-center '>
                <h1 className='  text-white font-bold text-xl lg:text-3xl'>Hello, Friends !</h1>
                <div className=' bg-white h-[3px] w-[15%] my-2 rounded-xl' />

                <h1 className=' text-center text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime dolore</h1>
                <Link to={"/login"} className='w-[40%]'><Button variant="outlined" size='small' className=' w-[100%]' sx={{
                    borderRadius: 10,
                    color: "#ffffff",
                    border: "1px white solid",
                    fontWeight: "bold",
                    margin: "10px",
                    "&:hover": {
                        border: "1px white solid",
                        color: "#0fc98a",
                        backgroundColor: "#ffffff"
                    }
                }} >Log-in</Button></Link>
            </div>

            <div className=' w-[100%] min-[875px]:w-[65%] bg-[#ffffff] rounded-r-xl max-[850px]:rounded-l-xl p-4 flex flex-col justify-center items-center relative '>
                <h1 className=' text-xl sm:text-3xl text-[#0fc98a] font-bold'>Sign up to create Account</h1>
                <div className=' w-[20%] h-[2px] my-2 mx-4 bg-black rounded-xl' />
                <section>
                    <FaUserCheck size={30} />
                </section>
                <h1 className=' text-sm text-gray-500 my-3'>If you have account, then login <Link to={"/login"} className=' font-semibold'><u>login</u></Link></h1>

                <section className={`${error == "" ? "hidden" : ""} flex justify-center items-center bg-[#0fc98a] text-white px-3 py-[5px] rounded-lg mb-3 `}>
                    <h1 className=' mx-3 text-sm font-semibold'>{error}</h1>
                    <MdCancel size={23} className=' cursor-pointer ' onClick={() => {
                        seterror("")
                    }} />
                </section>

                <form onSubmit={handlesubmit} className=' w-[100%] flex flex-col justify-center items-center'>
                    <div className='w-[70%] min-[850px]:w-[55%]'>
                        <TextField type='text' id="outlined-basic" onChange={(e) => {
                            setusername(e.target.value)
                            initialdata.username = ""
                            setinputerrors(initialdata)
                        }} value={username} label="username" variant="outlined" size="small" color="success" className=' w-[100%]' /><br />
                        <h1 className=' text-red-600 mb-2 text-sm font-semibold'>{inputerrors.username}</h1>
                    </div>
                    <div className='w-[70%] min-[850px]:w-[55%]'>
                        <TextField type='email' id="outlined-basic1" onChange={(e) => {
                            setemail(e.target.value)
                            initialdata.email = ""
                            setinputerrors(initialdata)
                        }} value={email} label="email" variant="outlined" size="small" color="success" className=' w-[100%]' /><br />
                        <h1 className=' text-red-600 mb-2 text-sm font-semibold'>{inputerrors.email}</h1>
                    </div>

                    <div className='w-[70%] min-[850px]:w-[55%]'>
                        <TextField type='password' id="outlined-basic2" onChange={(e) => {
                            setpassword(e.target.value)
                            initialdata.password = ""
                            setinputerrors(initialdata)
                        }} value={password} label="password" variant="outlined" size="small" color="success" className=' w-[100%]' /><br />
                        <h1 className=' text-red-600 mb-2 text-sm font-semibold'>{inputerrors.password}</h1>
                    </div>
                    <div className='w-[70%] min-[850px]:w-[55%]'>
                        <TextField type='password' id="outlined-basic3" onChange={(e) => {
                            setconfirm(e.target.value)
                            initialdata.confirm = ""
                            setinputerrors(initialdata)
                        }} value={confirm} label="confirm password" variant="outlined" size="small" color="success" className=' w-[100%]' /><br />
                        <h1 className=' text-red-600 mb-2 text-sm font-semibold'>{inputerrors.confirm}</h1>
                    </div>

                    <button type='submit' className=' bg-[#0fc98a] text-white px-10 py-[4px] rounded-2xl font-bold'>{loader ? <PulseLoader size={12} color='white' /> : "Sign up"}</button>
                </form>
                <h1 className=' absolute bottom-6 text-gray-500 font-semibold text-sm'>Privacy poicy  *  Terams & conditions</h1>
            </div>

        </div >
    )
}

export default Signup