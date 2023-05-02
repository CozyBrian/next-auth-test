import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Notes from './pages/notes'
import Login from './pages/login'
import Admin from './pages/admin'
import ProtectedRoute from './components/protectedRoute'
import PersistLogin from './components/persistLogin'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<PersistLogin />} >
          <Route element={<ProtectedRoute />} >
            <Route path='/notes' element={<Notes />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
