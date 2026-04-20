import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import FutogenLogo from '../assets/futogen_logo.png'
import { FigureCaption } from "react-bootstrap";
import service from "../Service/service";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigater = useNavigate()

    const [two_mark_question, setTwo_marks_question] = useState();
    const [ten_mark_question, setTen_mark_question] = useState();
    const [five_mark_question, setfive_mark_question] = useState();
    const [prac_question, setPrac_Question] = useState();
    const [datas, setDatas] = useState([])
    const [error, setError] = useState("")
    const [difficulty_level, setDifficulty_level] = useState("Difficulty Level")
    const [course_name, setCourse_name] = useState("Selece Course")
    function handleCourse(course) {
        setCourse_name(course)
    }
    function handleQuestionType(type) {
        setDifficulty_level(type)
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (course_name == "" || course_name == "Selece Course") {
            setError("Please Select Course ");
            return false;
        }
        if (isNaN(two_mark_question) || two_mark_question == "") {
            setError("Enter Valid 2 Mark Question ");
            return false;
        }
        if (isNaN(five_mark_question) || five_mark_question == "") {
            setError("Enter Valid 5 Mark..");
            return false;
        }
        if (isNaN(prac_question) || prac_question == "") {
            setError("Enter Valid Prac Mark..");
            return false;
        }
        if (isNaN(ten_mark_question) || ten_mark_question == "") {
            setError("Enter Valid 10 Mark..");
            return false;
        }
        if (difficulty_level == "" || difficulty_level == "Difficulty Level") {
            setError("Please Select Level ");
            return false;
        }
        setError("")
        const QuestionDetails = {
            course_name: course_name,
            difficulty_level: difficulty_level,
            two_mark_question: two_mark_question,
            five_mark_question: five_mark_question,
            ten_mark_question: ten_mark_question,
            prac_question: prac_question,
        }
        service.getQuestion(QuestionDetails).then((res) => {
            const data = res.data;
            console.log(data)
            navigater("/questionOutput", { state: data });

        }).catch(
            (erroe) => {
                console.log(error)
            }
        )
        console.log(datas)

    }
    return (
        <>
            <div className="main-container">
                <div className="form-container border border-1 rounded shadow-sm">
                    <form action="" onSubmit={(e) => { handleSubmit(e) }}>
                        <div >
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={FutogenLogo} style={{ width: '50%' }} alt="" />
                            </div>
                            <center><p className="p-0 my-3 text-danger">{error}</p> </center>
                            <Dropdown className="my-2">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    {course_name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => { handleCourse("Java") }}>Java</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleCourse("C") }}>C</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleCourse("C++") }}>C++</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { handleCourse("Python") }}>Python</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <div className="d-flex flex-wrap justify-content-md-between justify-content-center  mt-4">
                                <div className="input-group">
                                    <label htmlFor="2Marks">2 Mark's</label>
                                    <input type="text" id="2Marks" name="2Marks" onChange={(e) => { setTwo_marks_question(e.target.value) }} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="5Marks">5 Mark's</label>
                                    <input type="text" id="5Marks" name="5Marks" onChange={(e) => { setfive_mark_question(e.target.value) }} />
                                </div>
                            </div>

                            <div className="d-flex flex-wrap justify-content-md-between justify-content-center  mt-4">
                                <div className="input-group">
                                    <label htmlFor="10Marks">10 Mark's</label>
                                    <input type="text" id="10Marks" name="10Marks" onChange={(e) => { setTen_mark_question(e.target.value) }} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="Prac">Practical Question's</label>
                                    <input type="text" id="Prac" name="Prac" onChange={(e) => { setPrac_Question(e.target.value) }} />
                                </div>
                            </div>

                            <div className="d-flex  flex-wrap align-items-center justify-content-around  w-100">

                                <Dropdown className="my-2">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {difficulty_level}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { handleQuestionType("Easy") }}>Easy</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleQuestionType("Medium") }}>Medium </Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleQuestionType("Hard") }}>Hard</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <div className="my-2">
                                    <button className="btn btn-warning">Generate Questio Paper</button>
                                </div>

                            </div>

                        </div>
                    </form>

                </div>
            </div>

        </>
    );
}