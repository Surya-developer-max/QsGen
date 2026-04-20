import './App.css'
import Home from './Components/Home.jsx'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import QuestionOut from './Components/QuestionOut.jsx'
function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/"/>
        <Routes>
      
          <Route path='/questionOutput' element={<QuestionOut />} />
          <Route path='/' element={  <Home />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
