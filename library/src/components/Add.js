import React, { useState } from 'react'
import { postbookdetails } from '../Services/Apicall'
import {useNavigate} from 'react-router-dom'

function Add() {
  const[book,setbook]=useState({'title':'','author':'','pages':'','price':'','language':'','image':null})
  
  const navigate=useNavigate()

  async function postbook(event){
    event.preventDefault()
    let res= await postbookdetails(book)
    console.log(res)
    navigate('/view')
  }
  return (
    <div>
      <div class="container-fluid bg-secondary fw-bold p-5 mt-5 text-light w-75 border border-rounded rounded-3 shadow">
        <h3 class="text-center mb-3">Enter Books Details</h3>
        <div class="container w-75">
          <form onSubmit={postbook}>
          <div class="mb-3">
              <label class="form-label">Book Title</label>
              <input type='text' onChange={(event)=>{setbook({...book,'title':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Author</label>
              <input type='text' onChange={(event)=>{setbook({...book,'author':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Pages</label>
              <input type='number' onChange={(event)=>{setbook({...book,'pages':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Price</label>
              <input type='number' onChange={(event)=>{setbook({...book,'price':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Language</label>
              <input type='text' onChange={(event)=>{setbook({...book,'language':event.target.value})}} class="form-control"></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Image</label>
              <input type='file' onChange={(event)=>{setbook({...book,'image':event.target.files[0]})}} class="form-control"></input>
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

export default Add