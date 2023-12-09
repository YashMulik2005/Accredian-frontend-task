import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FaUserCheck } from 'react-icons/fa'
import axios from 'axios'
import { MdCancel } from 'react-icons/md'
import { PulseLoader } from 'react-spinners'


function Login() {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [usererror, setusererror] = useState("")
  const [passerror, setpasserror] = useState("")
  const [error, seterror] = useState(false)
  const [loader, setloader] = useState(false)

  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault()
    setloader(true)
    if (username == "") {
      setusererror("*username is required.")
    }
    if (password == "") {
      setpasserror("*password is required.")
    }
    if (username != "" && password != "") {
      const res = await axios.post(`https://accredian-backend-task-rho.vercel.app/user/login`, { username: username, password: password })
      console.log(res);
      if (res.data.data.success) {
        localStorage.setItem('username', username)
        navigate("/")
      }
      else {
        seterror(true)
      }
    }
    setusername("")
    setpassword("")
    setloader(false)
  }

  return (
    <div className=' h-[75vh] w-[85%] sm:w-[70%] flex rounded shadow-xl'>
      <div className='w-[100%] min-[850px]:w-[65%] bg-[#ffffff] rounded-l-xl max-[850px]:rounded-r-xl  p-4 flex flex-col justify-center items-center relative '>

        <h1 className=' text-3xl text-[#0fc98a] font-bold'>Sign in to Account</h1>
        <div className=' w-[20%] h-[2px] my-2 mx-4 bg-black rounded-xl' />
        <section>
          <FaUserCheck size={30} />
        </section>
        <h1 className=' text-sm text-gray-500 my-3'>signup if you don't have account, <Link to={"/signup"} className=' font-semibold'><u>Signup</u></Link></h1>

        <section className={` ${error ? "" : " hidden"} flex justify-center items-center bg-green-600 text-white px-3 py-[5px] rounded-lg mb-3 `}>
          <h1 className=' mx-3 text-sm font-semibold'>Username or password is invalid.</h1>
          <MdCancel size={23} className=' cursor-pointer ' onClick={() => {
            seterror(false)
          }} />
        </section>

        <form onSubmit={handlesubmit} className='  w-[100%] flex flex-col justify-center items-center'>
          <div className='w-[70%] min-[850px]:w-[55%]'>
            <TextField type='text' id="outlined-basic1" onChange={(e) => {
              setusername(e.target.value)
              setusererror("")
            }} value={username} label="username" variant="outlined" size="small" color="success" className=' w-[100%]' /><br />
            <h1 className=' text-red-600 mb-2 font-semibold'>{usererror}</h1>
          </div>

          <div className=' w-[70%] min-[850px]:w-[55%]'>
            <TextField type='password' id="outlined-basic2" onChange={(e) => {
              setpassword(e.target.value)
              setpasserror("")
            }} value={password} label="password" variant="outlined" size="small" color="success" className=' w-[100%]' /><br />
            <h1 className=' text-red-600 mb-2 font-semibold' >{passerror}</h1>
          </div>

          <button type='sumbit' className=' bg-[#0fc98a] text-white px-10 py-[4px] rounded-2xl my-1 font-bold'>{loader ? <PulseLoader size={12} color='white' /> : "Log in"}</button>
        </form>

        <h1 className=' absolute bottom-6 text-gray-500 font-semibold text-sm'>Privacy poicy  *  Terams & conditions</h1>
      </div>


      <div className='hidden min-[850px]:flex bg-[#0fc98a] h-[100%] rounded-r-xl w-[35%] p-4 flex-col justify-center items-center '>
        <h1 className=' text-white font-bold text-xl lg:text-3xl'>Hello, Friends !</h1>
        <div className=' bg-white h-[3px] w-[15%] my-2 rounded-xl' />

        <h1 className=' text-center text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime dolore</h1>
        <Link to={"/signup"} className=' w-[60%] lg:w-[40%]'><Button variant="outlined" size='small' className=' w-[100%]' sx={{
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
        }} >Sign-up</Button></Link>
      </div>

    </div >
  )
}

export default Login