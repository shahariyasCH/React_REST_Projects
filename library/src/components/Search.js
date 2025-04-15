import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { searchbook } from '../Services/Apicall'

function Search() {
  const [book,setbook]=useState([])
  const {search}=useLocation()
  const queryParams=new URLSearchParams(search)
  const w=queryParams.get('word')
  console.log(w)
  async function searchbooks(){
    let res=await searchbook(w)
    console.log(res.data)
    setbook(res.data)
  }
  useEffect(()=>{searchbooks()},[w])

  return (
    <div>
      <div class="container-fluid bg-secondary text-light mt-2 p-3 w-75">
            {Array.isArray(book)?
            <table class="table table-bordered table-secondary text-center">
                <thead>
                    <tr>
                        <th>IMAGE</th>
                        <th>TITLE</th>
                        <th>AUTHOR</th>
                        <th>PAGE</th>
                        <th>PRICE</th>
                        <th>LANGUAGE</th>
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
                    </tr>)}
                </tbody>
            </table>:<h2 class="text-center">No Results Fount</h2>
          }
        </div>
    </div>
  )
}

export default Search