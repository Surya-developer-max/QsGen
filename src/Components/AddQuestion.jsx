import { Row, Col } from 'react-bootstrap';
import Futogen_logo from '../assets/futogen_logo.png'
import Content_Categories from '../assets/Content Categories .png'
import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as XLSX from 'xlsx';
import service from '../Service/service';
export default function AddQuestion() {

    const [isLoading, setIsLoading] = useState(false)
    const [course_name, setCourse_name] = useState("Select Course");
    const [difficulty_level, setDifficulty_level] = useState("Difficulty Level");
    const [question, setQuestion] = useState("");
    const [error, setError] = useState("")
    const [topic, setTopic] = useState("")
    const [mark, setMark] = useState("Select Value");

    const [excelFile, setExcelFile] = useState();

    const fileRef = useRef(null)
    const [data, setData] = useState([]);

    const btnRef = useRef("");
    const tl = useRef();

    const [allQuestion, setAllQuestion] = useState([])
    const [filterQuestion, setFilterQuestion] = useState([])
    const el = document.querySelector('.topic-overlay')
    const [count, setCount] = useState(0)
    useEffect(() => {
        service.getAllQuestion().then(res => {
            setAllQuestion(res.data)

        }).catch(e => {
            console.log(e)
        })
        const el = document.querySelector('.topic-overlay')

        el.style.height = "0px"
        console.log(count)

    }, [count])


    useEffect(() => {
        btnRef.current.setAttribute('disabled', "true")
        if (question != "" && difficulty_level != "Difficulty Level" && course_name != "Select Course" && mark != "Select Value" && topic != "") {
            btnRef.current.removeAttribute('disabled')
        }
        if (data.length != 0) {
            btnRef.current.removeAttribute('disabled')
        }
    }, [mark, course_name, question, difficulty_level, data, topic])

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
    }, [])

    //---------------------------------------- CONTROLLED INPUT'S---------------------------
    function handleCourse(e) {
        setCourse_name(e.target.value)
        if (e.target.value == "Select Course") {
            setError("Please Select Course")
            errorInOut();
        }
    }

    function handleMark(e) {
        setMark(e.target.value)
        if (e.target.value == "Select Value") {
            setError("Please Select Mark")
            errorInOut();
        }
    }

    function handleQuestionType(e) {
        setDifficulty_level(e.target.value)
        if (e.target.value == "Difficulty Level") {
            setError("Please Select Level")
            errorInOut();
        }
    }

    function handleQuestion(e) {
        setQuestion(e.target.value)
        if (e.target.value == "") {
            setError("Add Some Question")
            errorInOut();
        }
    }
    function handleTopic(e) {
        setTopic(e.target.value)
        if (e.target.value == "") {
            setError("Add Some Topic")
            errorInOut();
        }
        el.style.height = "200px"
        setFilterQuestion(allQuestion.filter(item =>
            item.topic.toLowerCase().includes((e.target.value).toLowerCase())
        ))
        console.log(filterQuestion.length)
        if (filterQuestion.length == 0) {
            el.style.height = "0px"
        }
    }
    function colseOverlay() {
        el.style.height = "0px"
    }
    function setValue(e) {
        console.log(e)
        console.log(filterQuestion[e])
        setCourse_name(filterQuestion[e].course_name)
        setMark(filterQuestion[e].marks)
        setDifficulty_level(filterQuestion[e].difficulty_level)
        setQuestion(filterQuestion[e].question)
        setTopic(filterQuestion[e].topic)
        el.style.height = "0px"
    }

    // ----------------------------------------SUBMIT HANDLER-----------------------------------
    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        if (fileRef.current.value == "") {
            const data = {
                course_name: course_name,
                question: question,
                difficulty_level: difficulty_level,
                marks: mark,
                topic: topic.trim(),
            }

            service.addQuestion(data).then((res) => {
                setIsLoading(false)
                tl.current.play();
                setCount(prev => prev += 1)


            }).catch((e) => {

                if (e.status == 500) {
                    setIsLoading(false)
                    setError("Question already exist");
                    errorInOut();
                }
            })
        }
        else {
            service.addBulkQuestions(data).then((res) => {
                console.log(res)
                setIsLoading(false)
                tl.current.play();
                setTimeout(() => {
                    tl.current.reverse();
                }, 2000);
                setData([]);
                setCount(prev => prev++)
            }).catch(e => {
                setIsLoading(false)
                console.log(e)
            })
        }

    }

    // -------------------------------ERROR-------------------
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


    function handleClose() {
        tl.current.reverse();
    }
    function handleClick() {
        fileRef.current.click();
    }

    // ------------------------------PDF DOWNLOAD--------------------------
    function handleFile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' })
            const SheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[SheetName];
            const finalData = XLSX.utils.sheet_to_json(sheet)
            setData(finalData);
        }
    }


    return (
        <>
            <div className="add-question-container mt-5">
                {/* ------------------------------HEADER--------------------------- */}
                <div className="form-container-2  d-flex align-items-center position-relative w-100  mt-3" style={{ zIndex: '1' }}>
                    <form action="" className='mx-auto' onSubmit={handleSubmit}>
                        <div className='box rounded p-3 add-form'>
                            <div>
                                <h3 className='' style={{ fontWeight: '700' }}>Question Entry</h3>
                                <p style={{ fontSize: '15px' }}>Add individual items to your academic question bank with precision.</p>
                            </div>
                            <div>
                                <h4 className='mt-4' style={{ fontSize: '15px' }}> <span className='text-success'><img src={Content_Categories} style={{ width: '20px' }} alt="" /></span> CATEGORIZATION</h4>
                                <Row>
                                    <Col md={4} sm={4}>
                                        <div className="">
                                            <p className="input-name">SELECT COURSE</p>
                                            <select className=" w-100 rounded border-0" id="inputGroupSelect01" value={course_name} name="department" style={{ height: '50px' }} onChange={(e) => { handleCourse(e) }}>
                                                <option value="Select Course">Select Course</option>
                                                <option value="Java">Java</option>
                                                <option value='C'>C</option>
                                                <option value='C++'>C++</option>
                                                <option value='Python'>Python</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col md={4} sm={4}>
                                        <div className="">
                                            <p className="input-name">MARKS</p>
                                            <select className=" w-100 rounded border-0" id="inputGroupSelect01" value={mark} name="department" style={{ height: '50px' }} onChange={handleMark}>
                                                <option value="Select Value">Select Value</option>
                                                <option value="short_key">1</option>
                                                <option value="two_mark">2</option>
                                                <option value='five_mark'>5</option>
                                                <option value='ten_mark'>10</option>
                                                <option value='prac'>Practical</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col md={4} sm={4}>
                                        <div>
                                            <p className="m-0 p-0 input-name" >DIFFICULTY LEVEL</p>
                                            <select className=" w-100 rounded border-0 " value={difficulty_level} style={{ height: '50px', backgroundColor: '' }} onChange={(e) => { handleQuestionType(e) }}>
                                                <option value="Difficulty Level">Difficulty Level</option>
                                                <option value="Easy">Easy</option>
                                                <option value='Medium'>Medium</option>
                                                <option value='Hard'>Hard</option>
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className='relative'>
                                <div className='mt-4'>
                                    <label htmlFor="" className='text-success ' style={{ fontSize: '13px', fontWeight: '600' }}> TOPIC</label>
                                    <input type="text" onChange={(e) => { handleTopic(e) }} value={topic} />
                                </div>
                                <div className='position-absolute  bg-light border topic-overlay rounded-3 overflow-auto' style={{ height: '200px', width: '720px' }}>
                                    <p className='position-absolute  btn btn-danger m-2 ' onClick={colseOverlay} style={{ right: '0px' }}>close</p>
                                    {filterQuestion.map((el, inx) => {
                                        return (
                                            <p key={inx} onClick={() => { setValue(inx) }} className='cursor-pointer  fs-6 m-0 px-3 py-1 my-1'>{el.topic}: {el.question}</p>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <h4 className='mt-3' style={{ fontSize: '15px' }}><span className='text-success'><i className="ri-book-shelf-fill"></i></span>QUESTION COMPOSITION</h4>
                                <div>
                                    <textarea rows="5" className='w-100 rounded border border-1 p-1' placeholder='Type or paste your academic question here...' value={question} onChange={handleQuestion}></textarea>
                                </div>
                            </div>
                            <div className='d-flex w-100 justify-content-center flex-wrap justify-content-sm-between mt-3'>
                                <input type="file" hidden ref={fileRef} onChange={handleFile} accept='.xlsx, .xls .csv' />
                                <button className=' m-2 btn btn-secondary' type='button' onClick={handleClick}><span><i className="ri-file-upload-line"></i></span>Uplode Excel (bulk)</button>
                                <button className=' m-2 btn btn-success' type='submit' ref={btnRef}>Submit Question <span><i className="ri-send-plane-2-fill"></i></span></button>
                            </div>
                        </div>
                    </form>
                </div>

                {isLoading ? <div className='position-absolute top-0  d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw', zIndex: '10', backgroundColor: '#09090971' }}>
                    <div className="loader-div d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                        {/* <!-- From Uiverse.io by anand_4957 --> */}
                        <div className="book">
                            <div className="book__pg-shadow"></div>
                            <div className="book__pg"></div>
                            <div className="book__pg book__pg--2"></div>
                            <div className="book__pg book__pg--3"></div>
                            <div className="book__pg book__pg--4"></div>
                            <div className="book__pg book__pg--5"></div>
                        </div>

                    </div>
                </div>
                    : ""}

                <div className="error">
                    <p className="p-0 m-0 text-light fs-5">{error}</p>
                </div>

                <div className="plug-in" onClick={handleClose}>
                    <div className="card" >
                        <p>Question Added Successfully</p>
                        <p style={{ fontSize: '14px', fontWeight: '400', color: 'gray' }}>The question has been indexed and added to your academic bank.</p>
                        <button className='btn btn-success w-100' onClick={handleClose}>Dismiss</button>
                    </div>
                </div>
            </div>
        </>
    );
}