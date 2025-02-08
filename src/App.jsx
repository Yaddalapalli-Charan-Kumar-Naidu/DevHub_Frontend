
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Feed from './components/Feed'
import Login from './components/Login'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="feed" element={<Feed />} />
            <Route path="login" element={<Login/>} />
          </Route> 
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
