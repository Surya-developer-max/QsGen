import FutoGenLogo from '../assets/futogen_logo.png'
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewAll from './viewAll';
import QuestionOut from './QuestionOut'
import GenerateQuestion from './GenerateQuestion'
import AddQuestion from './AddQuestion';
export default function Navbar() {
    return (
        <>
            <BrowserRouter>
                <div className="nav-container shadow">
                    <div className="part1 ">
                        <Link to='/'><img src={FutoGenLogo} className='futogen-logo ' alt="" /></Link>
                    </div>
                    <div className="part2">
                        <button className='btn btn-success mx-1'> <Link to='/generateQuestion' className='text-white text-decoration-none'>Generate Paper</Link></button>
                        <button className='btn btn-success mx-1 '><Link to='/addQuestion' className='text-white text-decoration-none'>Add Question</Link></button>
                    </div>
                </div>
                <Routes>
                    <Route path='/' element={<ViewAll />} />
                    <Route path='/questionOutput' element={<QuestionOut />} />
                    <Route path='/addQuestion' element={<AddQuestion />} />
                    <Route path='/generateQuestion' element={<GenerateQuestion />} />
                </Routes>
            </BrowserRouter>

        </>
    );
}