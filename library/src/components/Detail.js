import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getbookdetail } from '../Services/Apicall'

function Detail() {
  const [book,setbook]=useState({})
  const {search}=useLocation()
  const queryParams=new URLSearchParams(search)
  const id=queryParams.get('id')
  
  async function fetchbook(){
    let res=await getbookdetail(id)
    setbook(res.data)
  }

  useEffect(()=>{fetchbook()},[])
  return (
    <div>
      <div class="container-fluid bg-secondary text-light mt-4 p-3 w-75">
            <h3 class='text-center mt-2 mb-3'>Book details</h3>
            <table class="table table-bordered table-secondary text-center">
              <thead>
                    <tr><th>TITLE</th><td>{book.title}</td></tr>
                    <tr><th>AUTHOR</th><td>{book.author}</td></tr>
                    <tr><th>PAGE</th><td>{book.pages}</td></tr>
                    <tr><th>PRICE</th><td>{book.price}</td></tr>
                    <tr><th>LANGUAGE</th><td>{book.language}</td></tr>
                    <tr><th>IMAGE</th><td><img src={book.image} height="100px" width="90px"></img></td></tr></thead>
            </table>
        </div>
    </div>
  )
}

export default Detail