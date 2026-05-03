import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import FutogenLogo from '../assets/futogen_logo.png'
import { FigureCaption } from "react-bootstrap";
import service from "../Service/service";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function GenerateQuestion() {

    const navigater = useNavigate()
    const buttonRef = useRef();
    const [total_mark, setTotal_mark] = useState(1);
    const [questionError, setQuestionError] = useState("")
    const [two_mark_question, setTwo_marks_question] = useState(0);
    const [ten_mark_question, setTen_mark_question] = useState(0);
    const [five_mark_question, setfive_mark_question] = useState(0);
    const [prac_question, setPrac_Question] = useState(0);
    const [short_key, setShort_key] = useState(0);
    const [error, setError] = useState("")
    const [difficulty_level, setDifficulty_level] = useState("Difficulty Level")
    const [course_name, setCourse_name] = useState("Select Course")
    const [total_calculated_mark, setTotal_calculated_mark] = useState(0)
    const [data, setData] = useState();
    const tl = useRef();
    const tl2 = useRef();

    const local_question_details = {
        short_key: short_key,
        two_mark: two_mark_question,
        five_mark: five_mark_question,
        ten_mark: ten_mark_question,
        prac: prac_question,
        total_mark: total_calculated_mark,
        course_name: course_name,
    }

    useEffect(() => {
        setTotal_calculated_mark((two_mark_question * 2) + (five_mark_question * 5) + (short_key * 1) + (ten_mark_question * 10) + (prac_question * 10))
        buttonRef.current.setAttribute("disabled", "true")

        if (total_calculated_mark > total_mark) {
            setError("Max Mark Reachaed")
            errorInOut();
        }

        if (total_calculated_mark == total_mark && course_name != "Select Course" && difficulty_level != "Difficulty Level") {
            buttonRef.current.removeAttribute('disabled')
        }
    }, [total_calculated_mark, total_mark, short_key, ten_mark_question, two_mark_question, five_mark_question, prac_question, course_name, difficulty_level])

    useGSAP(() => {

        gsap.set('.error', {
            x: "100%",
        })


        tl.current = gsap.timeline({ paused: true });

        tl.current
            .to('.plug-in', {
                opacity: 1,
                zIndex: 10,
                duration: .6,
                ease: 'power3.out'
            }, 0)
            .from('.card', {
                opacity: 0,
                ease: 'power2.out',
                duration: 0.2,
                zIndex: 11,
                y: 30,
                scale: 0.98,
            }, 0.4); // overlap animation

        tl2.current = gsap.timeline({ paused: true });
        tl2.current.from('.question-error', {
            x: -200,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out',
        })
    }, [])


    function handleCourse(course) {
        setCourse_name(course.target.value)
    }
    function handleQuestionType(type) {
        setDifficulty_level(type.target.value)
    }
    function handleShortKeys(e) {
        setShort_key(Number(e.target.value))
        if (isNaN(e.target.value)) {
            errorInOut();
            setError("Enter valid Short key ");
        }
    }
    function handleTwoMarks(e) {
        setTwo_marks_question(Number(e.target.value))
        if (isNaN(e.target.value)) {
            errorInOut();
            setError("Enter Valid 2 Mark Question ");
        }
    }
    function handleFiveMarks(e) {
        setfive_mark_question(Number(e.target.value))
        if (isNaN(e.target.value)) {
            errorInOut();
            setError("Enter Valid 2 Mark Question ");
        }
    }
    function handleTenMarks(e) {
        setTen_mark_question(Number(e.target.value))
        if (isNaN(e.target.value)) {
            errorInOut();
            setError("Enter Valid 2 Mark Question ");
        }
    }
    function handlePrac(e) {
        setPrac_Question(Number(e.target.value))
        if (isNaN(e.target.value)) {
            errorInOut();
            setError("Enter Valid 2 Mark Question ");
        }
    }

    function errorInOut() {
        gsap.to('.error', {
            x: 0,
            duration: 0.5,
            ease: 'cubic-bezier(0.00, 0.83, 0.16, 1.03)'
        })
        setTimeout(() => {
            gsap.to('.error', {
                x: "100%",
                duration: 0.5,
                ease: 'cubic-bezier(0.85, 0.00, 1.00, 0.43)'
            })
        }, 2000)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (difficulty_level == "" || difficulty_level == "Difficulty Level" || course_name == null) {
            errorInOut();
            setError("Please Select Level ");
            return false;
        }
        if (total_mark == 0) {
            errorInOut();
            setError("Please Set Mark Limit ");
            return false;
        }

        if (course_name == "" || course_name == "Select Course" || course_name == null) {
            errorInOut();
            setError("Please Select Course ");
            return false;
        }

        setError("")
        const QuestionDetails = {
            course_name: course_name,
            difficulty_level: difficulty_level,
            short_key: short_key,
            two_mark: two_mark_question,
            five_mark: five_mark_question,
            ten_mark: ten_mark_question,
            prac: prac_question,
        }

        service.getQuestion(QuestionDetails).then((res) => {
            setData(res.data);
            if (res.data.short_key.length < local_question_details.short_key) {
                setQuestionError(`We don't have enough short key question's`)
                tl2.current.play();
                setTimeout(() => {
                    tl2.current.reverse();
                }, 1000);
            }
            else if (res.data.two_mark.length < local_question_details.two_mark) {
                setQuestionError(`We don't have enough two mark question's`)
                tl2.current.play();
                setTimeout(() => {
                    tl2.current.reverse();
                }, 1000);
            }
            else if (res.data.five_mark.length < local_question_details.five_mark) {
                setQuestionError(`We don't have enough five mark question's`)
                tl2.current.play();
                setTimeout(() => {
                    tl2.current.reverse();
                }, 1000);
            }
            else if (res.data.ten_mark.length < local_question_details.ten_mark) {
                setQuestionError(`We don't have enough ten mark question's`)
                tl2.current.play();
                setTimeout(() => {
                    tl2.current.reverse();
                }, 1000);
            }
            else if (res.data.prac.length < local_question_details.prac) {
                setQuestionError(`We don't have enough pratical question's`)
                tl2.current.play();
                setTimeout(() => {
                    tl2.current.reverse();
                }, 1000);
            }
            else {
                tl.current.play();
            }
        }).catch((erroe) => {
            console.log(erroe)
        }
        )
    }

    function handleClose() {
        tl.current.reverse();
    }

    function handleRederictQuestionPaper() {
        tl.current.reverse();
        setTimeout(() => {
            navigater('/questionOutput', { state: { data, local_question_details } })
        }, 100)
    }

    return (
        <>
            <div className="main-container mt-5 w-100 d-flex justify-content-center" >
                <div className="body-container position-relative" style={{ zIndex: '1' }}>
                    <div className="header d-flex justify-content-center align-items-center w-100 flex-column">
                        <div className="box-1 w-100 d-flex flex-column align-items-center" >
                            <h3>Create Examination</h3>
                            <p style={{ fontSize: '15px' }} className="text-center">Engineer high-precision assessment tools with our advanced algorithmic paper generator. Define your parameters and let the architect handle the complexity</p>
                        </div>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-container m-3  p-3 rounded-3 ">
                            <Row className="mt-">
                                <Col md={8}  >
                                    <div>
                                        <p className="m-0 p-0 input-name">DIFFICULTY LEVEL</p>
                                        <select className=" w-100 rounded border-0 " style={{ height: '50px', backgroundColor: '' }} onChange={(e) => { handleQuestionType(e) }}>
                                            <option value="Difficulty Level">Difficulty Level</option>
                                            <option value="Easy">Easy</option>
                                            <option value='Medium'>Medium</option>
                                            <option value='Hard'>Hard</option>
                                        </select>
                                    </div>
                                </Col>

                                <Col md={2} sm={2} xs={4} className="d-flex jusfity-content-center align-items-center">
                                    <div className="total_mark mt-3 rounded bg-white d-flex flex-column align-items-center justify-content-center w-100">
                                        <p className="input-name text-secondary  text-center">TOTAL MARKS</p>
                                        <input type="text" onChange={(e) => { setTotal_mark(Number(e.target.value)) }} className=" text-success total-mark-input" style={{ height: '30px' }} />
                                    </div>
                                </Col>

                                <Col md={2} sm={2} xs={4} >
                                    <div className="d-flex justify-content-center align-items-center h-100 flex-column" ><p className="m-0" style={{ fontSize: '10px' }}> CURRENT MARK</p><h3 className="text-success m-0">{isNaN(total_calculated_mark) ? "-_-" : total_calculated_mark}</h3></div>
                                </Col>
                            </Row>
                            <div className=" mt-4">
                                <Row style={{ width: '100%' }} className="mb-4">
                                    <Col md={7} sm={6} xs={12} >
                                        <div className="mt-2">
                                            <p className="input-name">SELECT COURSE</p>
                                            <select className=" w-100 rounded border-0" id="inputGroupSelect01" name="department" style={{ height: '50px' }} onChange={(e) => { handleCourse(e) }}>
                                                <option value="Select Course">Select Course</option>
                                                <option value="Java">Java</option>
                                                <option value='C'>C</option>
                                                <option value='C++'>C++</option>
                                                <option value='Python'>Python</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col md={5} sm={6} xs={12} >
                                        <div className="mt-2">
                                            <p className="input-name">1 MARK(SHORTCUT KEY)</p>
                                            <input type="text" placeholder="0" className="w-100" onChange={handleShortKeys} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div>
                                <div>
                                    <h5><span className="text-success mx-1 mt-3"><i className="ri-menu-3-fill"></i></span>Assessmen Weights</h5>
                                </div>
                            </div>

                            <Row className="mt-4">
                                <Col md={3} sm={6} xs={6} >
                                    <div>
                                        <p className="m-0 p-0 input-name text-dark">2 MARKS</p>
                                        <input type="text" placeholder="0" onChange={handleTwoMarks} />
                                    </div>
                                </Col>
                                <Col md={3} sm={6} xs={6}>
                                    <div>
                                        <p className="m-0 p-0 input-name text-dark">5 MARKS</p>
                                        <input type="text" placeholder="0" onChange={handleFiveMarks} />
                                    </div>
                                </Col>
                                <Col md={3} sm={6} xs={6}>
                                    <div>
                                        <p className="m-0 p-0 input-name text-dark">10 MARKS</p>
                                        <input type="text" placeholder="0" onChange={handleTenMarks} />
                                    </div>
                                </Col>
                                <Col md={3} sm={6} xs={6}>
                                    <div>
                                        <p className="m-0 p-0 input-name text-dark">PRACTICAL QUESTIONS</p>
                                        <input type="text" placeholder="0" onChange={handlePrac} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <button className="btn btn-success w-100 py-3 mt-4 " ref={buttonRef}>Generate Question Paper</button>
                    </form>
                </div>

                <div className="error">
                    <p className="p-0 m-0 text-danger fs-5">{error}</p>
                </div>
                <div style={{ backgroundColor: '#fbeac9', color: '#C77700' }} className="question-error rounded d-flex justify-content-center align-items-center p-2">
                    <p className="m-0 " style={{ fontWeight: '700' }}>{questionError}</p>
                </div>

                <div className="plug-in" onClick={handleClose}>
                    <div className="card" >
                        <p>Question Generated Successfully.</p>
                        <button onClick={handleRederictQuestionPaper} className="btn btn-success">Start Test</button>
                    </div>
                </div>
            </div >
        </>
    );
}