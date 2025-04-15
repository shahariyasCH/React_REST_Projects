import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { editbookdetails, getbookdetail } from '../Services/Apicall'

function Edit() {
  const[book,setbook]=useState({'title':'','author':'','pages':'','price':'','language':'','image':null})
  const navigate=useNavigate()
  const {search}=useLocation()
  const queryParams=new URLSearchParams(search)
  const id=queryParams.get('id')

  async function fetchbook(){
    let res=await getbookdetail(id)
    setbook(res.data)
  }
  async function editbook(event){
    event.preventDefault()
    const cbook={...book}
    if(typeof cbook.image=='string'){
      delete cbook.image
    }
    let res =await editbookdetails(cbook,id)
    navigate('/view')
  }
  useEffect(()=>{fetchbook()},[])

  return (
    <div>
      <div class="container-fluid bg-secondary fw-bold p-5 mt-5 text-light w-75 border border-rounded rounded-3 shadow">
        <h3 class="text-center mb-3">Edit Books Details</h3>
        <div class="container w-75">
          <form onSubmit={editbook}>
          <div class="mb-3">
              <label class="form-label">Book Title</label>
              <input type='text' onChange={(event)=>{setbook({...book,'title':event.target.value})}} class="form-control" value={book.title}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Author</label>
              <input type='text' onChange={(event)=>{setbook({...book,'author':event.target.value})}} class="form-control" value={book.author}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Pages</label>
              <input type='number' onChange={(event)=>{setbook({...book,'pages':event.target.value})}} class="form-control" value={book.pages}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Price</label>
              <input type='number' onChange={(event)=>{setbook({...book,'price':event.target.value})}} class="form-control" value={book.price}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Language</label>
              <input type='text' onChange={(event)=>{setbook({...book,'language':event.target.value})}} class="form-control" value={book.language}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Image:</label>
              <img src={book.image} height="80px" width="80px" class='mb-1 ms-2'></img>
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

export default Edit