import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import Signup from './Pages/Signup'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './Components/Header'
import { Toaster } from 'react-hot-toast'
import Search from './Pages/Search'
import Listingpage from './Pages/Listingpage'
import Create from './Pages/Create'
import Editpost from './Pages/Editpost';
import { Usercontext } from './Context/Context'

function App() {
  let {user}=useContext(Usercontext)
  return <>
    <div>
      <Toaster/>
      <Header />
      <Routes>
        <Route path='/' element={user?<Home/>:<SignIn/>} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/search' element={<Search />} />
        <Route path='search/listing/:id' element={< Listingpage />} />
        <Route path='/listing/:id' element={< Listingpage />} />
        <Route path='/create' element={< Create />} />
        <Route path='/edit/:id' element={< Editpost />} />
        <Route path='*' element={<Home/>} />
    </Routes>
   
    </div>
   
  </>
}

export default App
