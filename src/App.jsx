
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
function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" element={<Feed />} />
            <Route path="login" element={<Login/>} />
            <Route path="connections" element={<Connections/>}/>
            <Route path="requests" element={<Requests/>}/>
            <Route path='profile' element={<Profile/>}/>
          </Route> 
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
