import React from 'react';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import './index.css';
import { SendMoney } from './pages/SendMoney';
function App(){

  return <>
  <BrowserRouter>
    <Routes>
      <Route path='/signup' element ={<Signup/>}/>
      <Route path='/signin' element ={<Signin/>}/>
      <Route path='/dashboard' element ={<Dashboard/>}/>
      <Route path='/send' element ={<SendMoney/>}/>
    </Routes>
  </BrowserRouter>
  </>

}

export default App