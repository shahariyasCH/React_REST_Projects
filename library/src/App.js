import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Add from './components/Add';
import Search from './components/Search';
import View from './components/View';
import Edit from './components/Edit';
import Detail from './components/Detail';
import { useEffect, useState } from 'react';

function App() {
  const [islogin,settoken]=useState(false)
  function checkloginstatus(){
    let token=localStorage.getItem('token')
    settoken(!(!token))
  }
  useEffect(()=>checkloginstatus(),[])

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar onlogout={checkloginstatus} islogin={islogin}/>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login onlogin={checkloginstatus}/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/add" element={<Add/>}></Route>
      <Route path="/edit" element={<Edit/>}></Route>
      <Route path="/detail" element={<Detail/>}></Route>
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/view" element={<View/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
