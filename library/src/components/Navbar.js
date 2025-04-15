import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutuser } from '../Services/Apicall'

function Navbar({onlogout,islogin}) {
  const [w,setw]=useState()
  const naviagte=useNavigate()
  async function logout(){
    let res=await logoutuser()
    console.log(res.data)
    if(res.status>199 && res.status<399){
      localStorage.removeItem('token')
      onlogout()
      naviagte('/login')
    }
  }
  function input(event){
    setw(event.target.value);
  }
  function searchbook(){
    console.log(w)
    naviagte(`/search?word=${w}`)
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
  <div class="container-fluid">
    <a class="navbar-brand text-light fs-2 fw-bold" href="#">Library</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse fs-5 fw-bold" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Link to="/">
          <a class="nav-link" aria-current="page" href="#">Home</a></Link>
        </li>
      {/* conditional rendering */}
        {islogin && 
        <>
        <li class="nav-item">
        <Link to="/view">
          <a class="nav-link" href="#">View</a></Link>
        </li>
        <li class="nav-item">
        <Link to="/add">
          <a class="nav-link" href="#">Add</a></Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" onClick={logout}>Logout</a>
        </li>
        </>}

        {!islogin &&
        <>
        <li class="nav-item">
        <Link to="/register">
          <a class="nav-link" href="#">Register</a></Link>
        </li>
        <li class="nav-item">
        <Link to="/login">
          <a class="nav-link" href="#">Login</a></Link>
        </li>
        </>
        }
      </ul>
        <input class="form-control me-2 w-25" type="search" onChange={input} placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-success" onClick={searchbook}>Search</button>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar