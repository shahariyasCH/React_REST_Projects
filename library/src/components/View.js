import React, { useEffect, useState } from 'react'
import { deletebookdetail, getallbooks } from '../Services/Apicall'
import { useNavigate } from 'react-router-dom'

function View() {
  const[book,setbook]=useState([])
  const naviagte=useNavigate()

  function detail(i){
    naviagte(`/detail?id=${i}`)
  }
  function edit(i){
    naviagte(`/edit?id=${i}`)
  }
  async function deletebook(i){
    let res = await deletebookdetail(i)
    if(res.status>199 && res.status<399){
      fetchbooks()
    }
    else{
      alert("Cant delete book record, Try again")
    }
  }

  async function fetchbooks(){
    let s=await getallbooks()
    setbook(s.data)
  }

  useEffect(()=>{fetchbooks()},[])

  return (
    <div>
        <div class="container-fluid bg-secondary text-light mt-2 p-3 w-75">
            <h3>Books</h3>
            <table class="table table-bordered table-secondary text-center">
                <thead>
                    <tr>
                        <th>IMAGE</th>
                        <th>TITLE</th>
                        <th>AUTHOR</th>
                        <th>PAGE</th>
                        <th>PRICE</th>
                        <th>LANGUAGE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {book.map((i)=><tr>
                        <td><img src={i.image} height="100px" width="90px"></img></td>
                        <td>{i.title}</td>
                        <td>{i.author}</td>
                        <td>{i.pages}</td>
                        <td>{i.price}</td>
                        <td>{i.language}</td>
                        <td><button class="btn btn-light me-2" onClick={()=>detail(i.id)}>detail</button><button class="btn btn-light me-2" onClick={()=>edit(i.id)}>Edit</button><button class="btn btn-light" onClick={()=>deletebook(i.id)}>Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default View