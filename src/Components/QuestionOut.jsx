import Futogen_logo from '../assets/futogen_logo.png';
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function QuestionOut() {
    const location = useLocation();
    const { data, local_question_details } = location.state || {};
    const [two_mark, setTwo_marks] = useState();
    const [ten_mark, setTen_mark] = useState();
    const [five_mark, setfive_mark] = useState();
    const [prac_question, setPrac_Question] = useState();
    const [short_key, setShort_key] = useState();
    const questionRef = useRef();
    if (!data || !local_question_details) {
        return <h2>No Data Found</h2>;
    }

    useEffect(() => {

        const roman_letter = ["I", "II", "III", "IV", "V"]
        let count = 0;
        if (questionRef.current) {
            var s = questionRef.current.querySelectorAll('.roman_letter');
            s.forEach((el) => {
                el.textContent = roman_letter[count];
                count++;
            })
        }
    }, [])

    useGSAP(() => {
        const elements = gsap.utils.toArray(questionRef.current.children)
        gsap.from(elements, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            stagger: 0.20,
        })
    }, [])

    return (
        <>
            <div className='question_paper'>
                <div className='mt-5'>
                    <center><img src={Futogen_logo} alt="" className='futogen-logo' /></center>
                </div>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <table className='question-paper-table mt-4' >
                        <thead>
                            <tr >
                                <th className='text-center'><b>C</b></th>
                                <th className='text-center'>Computer Basic & Internet Class</th>
                                <th className='p-1'>Total Marks:{local_question_details.total_mark} <br /> Date:</th>
                            </tr>
                            <tr>
                                <td className='p-1' style={{ borderRight: '0px' }}><b>Student Name:</b></td>
                            </tr>
                            <tr>
                                <td className='p-1' style={{ borderRight: '0px' }}> <b> Batch Timing:</b></td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div ref={questionRef}  className='d-flex justify-content-center align-items-center flex-column'>

                    {local_question_details?.short_key != 0 ? <div style={{ width: '90%' }} >
                        <div className=' mt-4  d-flex justify-content-between' >
                            <div className='d-flex'>
                                <p className='mx-1 m-0 my-1'><b className='roman_letter'>I</b></p><p className='ms-3 m-0 my-1'><b> Answer the Shortcut Keys (any {local_question_details.short_key}):-</b></p>
                            </div>
                            <div>
                                <p className='mx-1 m-0 my-1'><b>{local_question_details.short_key}X1={local_question_details.short_key}</b></p>
                            </div>
                        </div>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                {data.short_key.map((val, inx) => {
                                    return (
                                        <tr key={inx}>
                                            <td style={{ width: '30px' }}><p className='p-0 ms-2 m-0'> {inx + 1}</p></td>
                                            <td style={{ width: '300px' }}><p className='p-0 ms-2 m-0'>{val}</p></td>
                                            <td ></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div> : ""}

                    {local_question_details?.two_mark != 0 ? <div style={{ width: '90%' }}> 
                        <div className=' mt-4  d-flex justify-content-between' >
                            <div className='d-flex'>
                                <p className='mx-1 m-0 my-1'><b className='roman_letter'>II</b></p><p className='mx-1 m-0 my-1'><b> Answer the Questions (any {local_question_details.two_mark}) :-</b></p>
                            </div>
                            <div>
                                <p className='mx-1 m-0 my-1'><b>{local_question_details.two_mark}X2={local_question_details.two_mark * 2}</b></p>
                            </div>
                        </div>
                        <div style={{ width: "90%" }}>
                            {data.two_mark_question.map((val, inx) => {
                                return (
                                    <div key={inx}>
                                        <div className='d-flex'>
                                            <p className='p-0 mx-1 m-0'>{inx + 1}.</p><p className='p-0 ms-2 m-0'>{val}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div> : ""}


                    {local_question_details?.five_mark != 0 ? <div style={{ width: '90%' }}>
                        <div className=' mt-4  d-flex justify-content-between' >
                            <div className='d-flex'>
                                <p className='mx-1 m-0 my-1'><b className='roman_letter'>III </b></p><p className='mx-1 m-0 my-1'><b> Answer the Questions (any {local_question_details.five_mark}):- </b></p>
                            </div>
                            <div>
                                <p className='mx-1 m-0 my-1'><b>{local_question_details.five_mark}X5={local_question_details.five_mark * 5}</b></p>
                            </div>
                        </div>
                        <div style={{ width: "90%" }}>
                            {data.five_mark_question.map((val, inx) => {
                                return (
                                    <div key={inx}>
                                        <div className='d-flex'>
                                            <p className='p-0 mx-1 m-0'>{inx + 1}.</p><p className='p-0 ms-2 m-0'>{val}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div> : ""}

                    {local_question_details.ten_mark != 0 ?
                        <div style={{ width: '90%' }}>
                            <div className=' mt-4  d-flex justify-content-between' >
                                <div className='d-flex'>
                                    <p className='mx-1 m-0 my-1'><b className='roman_letter'>III </b></p><p className='mx-1 m-0 my-1'><b> Answer the Questions (any {local_question_details.ten_mark}):- </b></p>
                                </div>
                                <div>
                                    <p className='mx-1 m-0 my-1'><b>{local_question_details.ten_mark}X10={local_question_details.ten_mark * 10}</b></p>
                                </div>
                            </div>
                            <div style={{ width: "90%" }}>
                                {data.ten_mark_question.map((val, inx) => {
                                    return (
                                        <div key={inx}>
                                            <div className='d-flex'>
                                                <p className='p-0 mx-1 m-0'>{inx + 1}.</p><p className='p-0 ms-2 m-0'>{val}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        : ""}

                    {local_question_details.prac != 0 ?
                        <div style={{ width: '90%' }}>
                            <div className=' mt-4  d-flex justify-content-between' >
                                <div className='d-flex'>
                                    <p className='mx-1 m-0 my-1'><b className='roman_letter'>IV </b></p><p className='mx-1 m-0 my-1'><b> Pratical (any {local_question_details.prac}):- </b></p>
                                </div>
                                <div>
                                    <p className='mx-1 m-0 my-1'><b>{local_question_details.prac}X10={local_question_details.prac * 10}</b></p>
                                </div>
                            </div>
                            <div style={{ width: "90%" }}>
                                {data.prac_question.map((val, inx) => {
                                    return (
                                        <div key={inx}>
                                            <div className='d-flex'>
                                                <p className='p-0 mx-1 m-0'>{inx + 1}.</p><p className='p-0 ms-2 m-0'>{val}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        : ""}
                </div>

            </div>
        </>
    );
}