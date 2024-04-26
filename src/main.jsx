import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Usercontextprovider from './Context/Context.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';






ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Usercontextprovider>
      <App />
      </Usercontextprovider>
  </BrowserRouter>
  
)
