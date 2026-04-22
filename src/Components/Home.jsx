import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import FutogenLogo from '../assets/futogen_logo.png'
import { FigureCaption } from "react-bootstrap";
import service from "../Service/service";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Home() {

    const navigater = useNavigate()
    const buttonRef = useRef();
    const [isDissable, setIsDissable] = useState(false)
    const [total_mark, setTotal_mark] = useState(0);
    const [two_mark_question, setTwo_marks_question] = useState(0);
    const [ten_mark_question, setTen_mark_question] = useState(0);
    const [five_mark_question, setfive_mark_question] = useState(0);
    const [prac_question, setPrac_Question] = useState(0);
    const [short_key, setShort_key] = useState(0);
    const [error, setError] = useState("")
    const [difficulty_level, setDifficulty_level] = useState("Difficulty Level")
    const [course_name, setCourse_name] = useState("Select Course")
    const total_calculated_mark = (two_mark_question * 2) + (five_mark_question * 5) + (short_key * 1) + (ten_mark_question * 10) + (prac_question * 10);
    const [data, setData] = useState();

    const local_question_details = {
        short_key: short_key,
        two_mark: two_mark_question,
        five_mark: five_mark_question,
        ten_mark: ten_mark_question,
        prac: prac_question,
        total_mark: total_calculated_mark,
    }
    useEffect(() => {
        if (total_calculated_mark > total_mark) {
            if (buttonRef.current) {
                buttonRef.current.setAttribute("disabled", "true")
            }

            setError("Max Mark Reachaed")
            errorInOut();
        }
        else {
            if (buttonRef.current) {
                buttonRef.current.removeAttribute("disabled");
            }
        }
    }, [total_calculated_mark, total_mark])
    useGSAP(() => {

        gsap.set('.plug-in', {
            opacity: 0,
            zIndex: -1,
        })
        gsap.set('.card', {
            opacity: 0,
            y: -100,
        })

        gsap.set('.error', {
            x: "100%",
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
    }
    function handleTwoMarks(e) {
        setTwo_marks_question(Number(e.target.value))
    }
    function handleFiveMarks(e) {
        setfive_mark_question(Number(e.target.value))
    }
    function handleTenMarks(e) {
        setTen_mark_question(Number(e.target.value))
    }
    function handlePrac(e) {
        setPrac_Question(Number(e.target.value))
    }

    function handleRederictQuestionPaper() {

        gsap.timeline().to('.card', {
            opacity: 0,
            y: -100,
            ease: 'cubic-bezier(0.00, 0.34, 0.25, 1.00)',
        }).to('.plug-in', {
            opacity: 0,
            zIndex: -1,
        })
        setTimeout(() => {
            navigater('/questionOutput', { state: { data, local_question_details } })
        }, 900)


    }

    function errorInOut() {
        gsap.to('.error', {
            x: 0,
            duration: 0.5,
            ease: 'cubic-bezier(0.00, 0.96, 0.20, 0.99)'
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
        if (course_name == "" || course_name == "Select Course") {
            errorInOut();
            setError("Please Select Course ");
            return false;
        }
        if (isNaN(short_key)) {
            errorInOut();
            setError("Enter valid Short key ");
            return false;
        }
        if (isNaN(two_mark_question)) {
            errorInOut();
            setError("Enter Valid 2 Mark Question ");
            return false;
        }
        if (isNaN(five_mark_question)) {
            errorInOut();
            setError("Enter Valid 5 Mark..");
            return false;
        }
        if (isNaN(prac_question)) {
            errorInOut();
            setError("Enter Valid Prac Mark..");
            return false;
        }
        if (isNaN(ten_mark_question)) {
            errorInOut();
            setError("Enter Valid 10 Mark..");
            return false;
        }
        if (ten_mark_question == 0 && two_mark_question == 0 && short_key == 0 && prac_question == 0 && five_mark_question == 0) {
            errorInOut();
            setError("Add atlest one question")
            return false;
        }
        if (total_mark == 0) {
            errorInOut();
            setError("Please Set Mark Limit ");
            return false;
        }
        if (difficulty_level == "" || difficulty_level == "Difficulty Level") {
            errorInOut();
            setError("Please Select Level ");
            return false;
        }
        setError("")
        const QuestionDetails = {
            course_name: course_name,
            difficulty_level: difficulty_level,
            short_key: short_key,
            two_mark_question: two_mark_question,
            five_mark_question: five_mark_question,
            ten_mark_question: ten_mark_question,
            prac_question: prac_question,
        }

        service.getQuestion(QuestionDetails).then((res) => {
            setData(res.data);
            gsap.timeline().to('.plug-in', {
                opacity: 1,
                zIndex: 1,
                duration: 0.5
            }).to('.card', {
                opacity: 1,
                y: 0,
                ease: 'cubic-bezier(0.00, 0.34, 0.25, 1.00)',
                duration: 0.5
            })
        }).catch((erroe) => {
            console.log(erroe)
        }
        )
    }

    return (
        <>
            <div className="main-container">

                <div className="body-container">
                    <div className="header">
                        <img src={FutogenLogo} className="futogen-logo" alt="" />
                        <div className="box-1 mt-5" >
                            <h1>Create Examination</h1>
                            <p>Engnieer high-precision assessment tools with our advanced algorithmic paper generator. Define your parameters and let the architect handle the complexity</p>
                        </div>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-container m-1 mt-5 p-3 rounded-3 ">
                            <div className=" ">
                                <Row style={{ width: '100%' }} className="mb-4">
                                    <Col md={7} sm={6} xs={12} >
                                        <div className="mt-2">
                                            <p className="input-name">SELECT COURSE</p>
                                            <select className=" w-100 rounded border-0" id="inputGroupSelect01" name="department" style={{ height: '50px' }} onChange={(e) => { handleCourse(e) }}>
                                                <option value="null">Select Course</option>
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
                                    <h2>Assessmen Weights</h2>
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

                            <Row className="mt-4">
                                <Col md={10} sm={8} >
                                    <div>
                                        <p className="m-0 p-0 input-name">DIFFICULTY LEVEL</p>
                                        <select className=" w-100 rounded border-0" id="inputGroupSelect01" name="department" style={{ height: '50px' }} onChange={(e) => { handleQuestionType(e) }}>
                                            <option value="null">Difficulty Level</option>
                                            <option value="Easy">Easy</option>
                                            <option value='Medium'>Medium</option>
                                            <option value='Hard'>Hard</option>

                                        </select>
                                    </div>

                                </Col>
                                <Col md={2} sm={2} xs={4} className="d-flex jusfity-content-center align-items-center">
                                    <div className="total_mark mt-3 rounded bg-white">
                                        <p className="input-name text-secondary  text-center">TOTAL MARKS</p>
                                        <input type="text" onChange={(e) => { setTotal_mark(Number(e.target.value)) }} className="rounded-5 text-success d-flex justify-content-center align-items-center fs-5" style={{ height: '30px' }} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <button className="btn btn-success w-100 py-3 mt-4" ref={buttonRef}>Generate Question Paper</button>
                    </form>
                </div>

                <div className="error">
                    <p className="p-0 m-0 text-danger fs-5">{error}</p>
                </div>
                <div className="plug-in">
                    <div className="card">
                        <p>Question Generater Successfully.</p>
                        <button onClick={handleRederictQuestionPaper}>Get Question</button>
                    </div>
                </div>
            </div >
        </>
    );
}