import Futogen_logo from '../assets/futogen_logo.png';
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

export default function QuestionOut() {
    const location = useLocation();
    const data = location.state || {};
    console.log(data)
    return (
        <>
            <div>
                <div className='mt-5'>
                    <center><img src={Futogen_logo} alt="" className='futogen-logo' /></center>
                </div>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <table className='question-paper-table mt-4' >
                        <thead>
                            <tr >
                                <th className='text-center'><b>C</b></th>
                                <th className='text-center'>Computer Basic & Internet Class</th>
                                <th className='p-1'>Total Marks:100 <br /> Date:</th>
                            </tr>
                            <tr>
                                <td className='p-1' style={{ borderRight: '0px' }}><b>Student Name:</b></td>
                            </tr>
                            <tr>
                                <td className='p-1' style={{ borderRight: '0px' }}> <b> Batch Timing:</b></td>
                            </tr>
                        </thead>
                    </table>
                    <div className=' mt-4  d-flex justify-content-between' style={{ width: '90%' }}>
                        <div className='d-flex'>
                            <p><b>I </b></p><p className='ms-3'><b> Answer the Shortcut Keys:-</b></p>
                        </div>
                        <div>
                            <p><b>10X1=10</b></p>
                        </div>
                    </div>
                    <table className='question-paper-table'>
                        <tbody>
                            {data.two_mark_question.map((val, inx) => {
                                return (
                                    <>
                                        <tr key={inx}>
                                            <td style={{ width: '30px' }}><p className='p-0 ms-2 m-0'> {inx + 1}</p></td>
                                            <td style={{width:'300px'}}><p className='p-0 ms-2 m-0'>{val}</p></td>
                                            <td ></td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className=' mt-4  d-flex justify-content-between' style={{ width: '90%' }}>
                        <div className='d-flex'>
                            <p><b>II</b></p><p className='ms-3'><b> Answer the Questions:-</b></p>
                        </div>
                        <div>
                            <p><b>5X4=20</b></p>
                        </div>
                    </div>
                    <div style={{ width: "90%" }}>
                        {data.two_mark_question.map((val, inx) => {
                            return (
                                <>
                                    <div key={inx}>
                                        <div className='d-flex'>
                                            <p>{inx + 1}.</p><p className='p-0 ms-2 m-0'>{val}</p>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>

                    <div className=' mt-4  d-flex justify-content-between' style={{ width: '90%' }}>
                        <div className='d-flex'>
                            <p><b>III </b></p><p className='ms-3'><b> Answer the Questions (any 5):- </b></p>
                        </div>
                        <div>
                            <p><b>5X6=30</b></p>
                        </div>
                    </div>
                    <div style={{ width: "90%" }}>
                        {data.ten_mark_question.map((val, inx) => {
                            return (
                                <>
                                    <div key={inx}>
                                        <div className='d-flex'>
                                            <p>{inx + 1}.</p><p className='p-0 ms-2 m-0'>{val}</p>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div className=' mt-4  d-flex justify-content-between' style={{ width: '90%' }}>
                        <div className='d-flex'>
                            <p><b>IV </b></p><p className='ms-3'><b> Pratical (any 4):- </b></p>
                        </div>
                        <div>
                            <p><b>5X6=30</b></p>
                        </div>
                    </div>
                    <div style={{ width: "90%" }}>
                        {data.prac_question.map((val, inx) => {
                            return (
                                <>
                                    <div key={inx}>
                                        <div className='d-flex'>
                                            <p>{inx + 1}.</p><p className='p-0 ms-2 m-0'>{val}</p>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}