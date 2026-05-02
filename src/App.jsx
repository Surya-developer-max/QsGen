import './App.css'
import Home from './Components/Home.jsx'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import QuestionOut from './Components/QuestionOut.jsx'
import AddQuestion from './Components/AddQuestion.jsx'
import ViewAll from './Components/viewAll.jsx'
function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/" />
        <Routes>
          <Route path='/' element={<ViewAll/>} />
          <Route path='/addQuestion' element={<AddQuestion />} />
          <Route path='/questionOutput' element={<QuestionOut />} />
          {/* <Route path='/' element={  <Home />} /> */}
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
