import React, { useState } from 'react'
import { loginuser } from '../Services/Apicall'
import { useNavigate } from 'react-router-dom'

function Login({onlogin}) {
  const[user,setuser]=useState({'username':'','password':''})
  const naviagte=useNavigate()
  async function login(event){
    event.preventDefault()
    let res = await loginuser(user)
    console.log(res.data)

    let d=res.data['token']
    localStorage.setItem('token','token '+d)
    onlogin()
    console.log(localStorage.getItem('token'))
    naviagte('/')
  }
  return (
    <div>
      <div class="container-fluid bg-secondary fw-bold p-5 mt-5 text-light w-75 border border-rounded rounded-3 shadow">
        <h3 class="text-center mb-3">Enter Login details</h3>
        <div class="container w-75">
          <form onSubmit={login}>
          <div class="mb-3">
              <label class="form-label">Username</label>
              <input type='text' onChange={(event)=>{setuser({...user,'username':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type='password' onChange={(event)=>{setuser({...user,'password':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mt-4 text-center">
              <input type='submit' class="btn btn-success"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login