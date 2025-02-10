
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Feed from './components/Feed'
import Login from './components/Login'
import store  from './store/store.js'
import { Provider } from 'react-redux'
import Connections from "./components/Connections"
import  Requests from "./components/Requests"
import Profile from "./components/Profile"  
import ProtectedRoute from './components/ProtectedRoute.jsx'
function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" element={
              <ProtectedRoute>
              <Feed />
              </ProtectedRoute>
              } />
            <Route path="login" element={
              <Login/>
            }/>
            <Route path="connections" element={
              <ProtectedRoute>
              <Connections/>
              </ProtectedRoute>}/>
            <Route path="requests" element={
              <ProtectedRoute>
              <Requests/>
              </ProtectedRoute>}/>
            <Route path='profile' element={
              <ProtectedRoute>
              <Profile/>
              </ProtectedRoute>}/>
          </Route> 
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
