import React, { useState } from 'react'
import { createuser } from '../Services/Apicall'
import { useNavigate } from 'react-router-dom'

function Register() {
  const[user,setuser]=useState({'username':'','password':'','email':'','first_name':'','last_name':''})
  const naviagte=useNavigate()
  async function register(event){
    event.preventDefault()
    let res=await createuser(user)
    console.log(res)
    naviagte('/')
  }
  return (
    <div>
      <div class="container-fluid bg-secondary fw-bold p-5 mt-5 text-light w-75 border border-rounded rounded-3 shadow">
        <h3 class="text-center mb-3">Enter User details</h3>
        <div class="container w-75">
          <form onSubmit={register}>
          <div class="mb-3">
              <label class="form-label">Username</label>
              <input type='text' onChange={(event)=>{setuser({...user,'username':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type='password' onChange={(event)=>{setuser({...user,'password':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type='email' onChange={(event)=>{setuser({...user,'email':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">First_name</label>
              <input type='text' onChange={(event)=>{setuser({...user,'first_name':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Last_name</label>
              <input type='text' onChange={(event)=>{setuser({...user,'last_name':event.target.value})}} class="form-control"></input>
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

export default Register