import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import service from "../Service/service";
import Content_Categories from '../assets/Content Categories .png'
import NoData from '../assets/No data-bro.png'
export default function ViewAll() {

    // LODER
    const [isLoading, setIsLoading] = useState(true)

    // FOR DATA
    const [data, setData] = useState([]);
    const [dummyData, setDummyData] = useState([])
    const [questionId, setQuestionId] = useState(0);
    const [error, setError] = useState("")
    const [count, setCount] = useState(0)
    const [deleteId, setDeleteId] = useState(0)

    // FOR EDIT QUESTIONS
    const [mark, setMark] = useState();
    const [course_name, setCourse_name] = useState("");
    const [difficulty_level, setDifficulty_level] = useState("Difficulty Level");
    const [question, setQuestion] = useState("");
    const [topic, setTopic] = useState("")

    // FOR PAGENATION
    const [currentPage, setCurrentPage] = useState(1);
    const [questionPerPage, setQuestionPerPage] = useState(10)
    const indexOfLaseQuestion = currentPage * questionPerPage
    const indexOfFirstQuestion = indexOfLaseQuestion - questionPerPage
    const totalPages = Math.ceil(data.length / questionPerPage)
    const [filterDummyPages, setFilterDummyPages] = useState(0)

    // FOR FILTER
    const [filterDataLength, setFilerDataLength] = useState(0)
    const [filterMark, setFilterMark] = useState("All");
    const [filterCourseName, setFilterCourseName] = useState("All");
    const [filterDiffi, setFilterDiffi] = useState("All");
    const [search, setSearch] = useState(null);
    const [filterTopic, setFilterTopic] = useState("")
    const navigate = useNavigate();

    const tl = useRef();
    const btnRef = useRef("");
    const tl2 = useRef();
    const tl3 = useRef();

    // ------------GSAP ANIMATION----------------
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
            .from('.edit-question', {
                opacity: 0,
                ease: 'power2.out',
                duration: 0.2,
                zIndex: 11,
                y: 30,
                scale: 0.98,
            }, 0.4); // overlap animation

        tl2.current = gsap.timeline({ paused: true })
        tl2.current.from('.edit-pop-up', {
            y: -160,
            duration: 1,
            ease: 'elastic.out',
        })

        tl3.current = gsap.timeline({ paused: true })
        tl3.current.from('.conform-delete', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out',
        })
    })

    // ------------FOR BUTTON------------
    useEffect(() => {
        btnRef.current.setAttribute('disabled', "true")
        if (question != "" && difficulty_level != "Difficulty Level" && course_name != "Select Course" && mark != "Select Value") {
            btnRef.current.removeAttribute('disabled')
        }
    }, [mark, course_name, question, difficulty_level])

    // -----------------GET DATA-------------
    useEffect(() => {
        service.getAllQuestion().then((res) => {
            const data = res.data;
            setData(data.sort((a, b) => b.id - a.id))
            const currentPage = data.slice(indexOfFirstQuestion, indexOfLaseQuestion)
            setDummyData(currentPage)
            setIsLoading(false)
        }).catch((e) => {
            setIsLoading(false)
            console.log(e)
        })
    }, [count])

    // -------------------FILTER DATA---------------------
    useEffect(() => {
        let result = data;
        //    search
        if (search != "" && search) {
            result = result.filter((items) =>
                items.question.toLowerCase().includes(search.toLowerCase())
            )
        }
        if (filterTopic != "" && filterTopic) {
            result = result.filter((items) =>
                items.topic.toLowerCase().includes(filterTopic.toLowerCase())
            )
        }
        //    course
        if (filterCourseName != "All") {
            result = result.filter((items) =>
                items.course_name === filterCourseName
            )
        }
        if (filterDiffi != "All") {
            result = result.filter((items) =>
                items.difficulty_level === filterDiffi
            )
        }
        if (filterMark != "All") {
            result = result.filter((items) =>
                items.marks === filterMark
            )
        }

        const currentPage1 = result.slice(indexOfFirstQuestion, indexOfLaseQuestion)
        setFilerDataLength(result.length)
        setFilterDummyPages(Math.ceil(result.length / questionPerPage))
        setDummyData(currentPage1)

    }, [filterCourseName, filterDiffi, filterMark, search, currentPage, filterTopic])


    function handleClose() {
        tl.current.reverse();
    }

    function handlePage(val) {
        setCurrentPage(val)
    }
    // --------------------- FOR EDIT QUESTIONS--------------------------------------
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
            setError("Question can't be empty")
            errorInOut();
        }
    }
    function handleTopic(e) {
        setTopic(e.target.value)
        if (e.target.value == "") {
            setError("Topic can't be empty")
            errorInOut();
        }
    }
    //---------------- FOR FILETER DATAS--------------------
    function handlefilterCourseName(e) {
        if (currentPage != 1) {
            setCurrentPage(1)
        }
        setFilterCourseName(e.target.value);
    }
    function handleFilterDiffiLevel(e) {
        if (currentPage != 1) {
            setCurrentPage(1)
        }
        setFilterDiffi(e.target.value)
    }
    function handlefilterMark(e) {
        if (currentPage != 1) {
            setCurrentPage(1)
        }
        setFilterMark(e.target.value)
    }

    function handleSearch(e) {
        if (currentPage != 1) {
            setCurrentPage(1)
        }
        setSearch(e.target.value)
    }
    function handleFilterTopic(e) {
        setFilterTopic(e.target.value)
    }

    // ------------------FOR HANDLE EDIT--------------------
    function handleEdit(id) {
        setIsLoading(true)
        service.getQuestionById(id).then((res) => {
            setQuestionId(id);
            var data = res.data;
            setIsLoading(false)
            setCourse_name(data.course_name);
            setDifficulty_level(data.difficulty_level)
            setMark(data.marks)
            setQuestion(data.question)
            setTopic(data.topic)
            tl.current.play();
        }).catch((e) => {
            setIsLoading(false)
            console.log(e)
        })
    }
    // --------------------FOR HANDLE DELETE---------------------
    function handleDelete(id) {
        setDeleteId(id)
        tl3.current.play()
    }
    function conformDelete() {
        setIsLoading(true)
        service.deleteQuestion(deleteId).then((res) => {
            setError("Question deleted")
            errorInOut();
            setIsLoading(false)
            setData(data.filter(a => {
                return a.id !== deleteId;
            }))
            setDummyData(dummyData.filter(a => {
                return a.id !== deleteId;
            }))
            tl3.current.reverse();
        }).catch((e) => {
            setIsLoading(false)
            console.log(e);
        })
    }

    //---------------------- FOR FORM SUBMIT-----------------------
    function handleEditSubmit(e) {
        e.preventDefault();

        const data = {
            course_name: course_name,
            question: question,
            difficulty_level: difficulty_level,
            marks: mark,
            topic: topic
        }
        setIsLoading(true)
        service.editQustion(data, questionId).then((res) => {
            setIsLoading(false)
            setCount(count + 1)
            tl.current.reverse();
            setTimeout(() => {
                tl2.current.play();
            }, 1000);
            setTimeout(() => {
                tl2.current.reverse();
            }, 2000);

        }).catch((e) => {
            console.log(e.status)
            setIsLoading(false)
            if (e.status == 500) {
                setError("Question Already Exist")
                errorInOut();
            }
        })
    }

    // --------------------FOR ERROR-----------------------
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
    // ----------X-----------------X----------------------X-------------------
    return (
        <>
            <div className="view-container w-100  " style={{ zIndex: '0' }}>
                {/* ---------------------------QUESTION BODY---------------------------- */}
                <div className="view-body rounded p-2 position-relative " style={{ zIndex: '1' }}>
                    {/* ------------------------HEADER PART------------------------ */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div >
                            <h3>Question Bank</h3>
                            <p>Manage and create your repository of academic challenges.</p>
                        </div>
                    </div>

                    {/* -------------------------SEARCH AND FILTER BLOCK--------------------- */}
                    <div className="search-block pb-2 px-2 rounded">
                        <Row >
                            <Col md={6} className="d-flex">
                                <div className=" h-100 me-1" style={{ marginTop: '20px', width: '50%' }} >
                                    <input type="text" placeholder="Search question, keywords, or topics..." className="w-100" onChange={handleSearch} />
                                </div>
                                <div className=" h-100 " style={{ marginTop: '20px', width: '50%' }} >
                                    <input type="text" placeholder="Search by topic" className="w-100" onChange={handleFilterTopic} />
                                </div>
                            </Col>
                            <Col md={2} sm={12} xs={6}>
                                <div className="">
                                    <p className="input-name">SELECT COURSE</p>
                                    <select className=" w-100 rounded border-0" id="inputGroupSelect01" name="department" style={{ height: '50px' }} onChange={handlefilterCourseName} >
                                        <option value="All">All</option>
                                        <option value="Java">Java</option>
                                        <option value='C'>C</option>
                                        <option value='C++'>C++</option>
                                        <option value='Python'>Python</option>
                                    </select>
                                </div>
                            </Col>
                            <Col md={2} sm={6} xs={6}>
                                <div className="">
                                    <p className="input-name">MARKS</p>
                                    <select className=" w-100 rounded border-0" id="inputGroupSelect01" name="department" style={{ height: '50px' }} onChange={handlefilterMark}>
                                        <option value="All">All</option>
                                        <option value="short_key">1</option>
                                        <option value="two_mark">2</option>
                                        <option value='five_mark'>5</option>
                                        <option value='ten_mark'>10</option>
                                        <option value='prac'>Practical</option>
                                    </select>
                                </div>
                            </Col>
                            <Col md={2} sm={6} >
                                <div>
                                    <p className="m-0 p-0 input-name" >DIFFICULTY LEVEL</p>
                                    <select className=" w-100 rounded border-0 " style={{ height: '50px', backgroundColor: '' }} onChange={handleFilterDiffiLevel} >
                                        <option value="All">All</option>
                                        <option value="Easy">Easy</option>
                                        <option value='Medium'>Medium</option>
                                        <option value='Hard'>Hard</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/*--------------------- QUESTION BODY---------------------------- */}
                    <div className=" question-container overflow-x-scroll">
                        <div className="question-body">
                            <div className="question-headings d-flex mt-5">
                                <div className="part-1" >
                                    <p className="text-secondary" style={{ fontWeight: '500', fontSize: '13px' }}>QUESTION DETAILS</p>
                                </div>
                                <div className="part-2"> <p className="text-secondary" style={{ fontWeight: '500', fontSize: '13px' }}>COURSE</p></div>
                                <div className="part-3"><p className="text-secondary" style={{ fontWeight: '500', fontSize: '13px' }}>MARKS</p></div>
                                <div className="part-4"><p className="text-secondary" style={{ fontWeight: '500', fontSize: '13px' }}>DIFFICULTY</p></div>
                                <div className="part-4"><p className="text-secondary" style={{ fontWeight: '500', fontSize: '13px' }}>TOPIC</p></div>
                                <div className="part-5"><p className="text-secondary" style={{ fontWeight: '500', fontSize: '13px' }}>ACTION</p></div>
                            </div>
                            <div className=""><p className="text-secondary m-0" style={{ fontWeight: '500', fontSize: '13px' }}>Showing:{filterDataLength == 0 ? dummyData.length : filterDataLength} of {data.length}</p></div>
                            <div>
                                <div>
                                    {dummyData.length != 0 ? dummyData.map((val, inx) => {
                                        return (
                                            <div key={inx} className="d-flex  my-2 p-2  rounded question-block"  >
                                                <div className="part-1">
                                                    <p className="m-0">{val.question} </p>
                                                </div>
                                                <div className="part-2"> <p className="text-success m-0">{val.course_name}</p></div>
                                                <div className="part-3"><p className=" mark py-1 px-2 rounded m-0" >{val.marks == "two_mark" ? "2M" : val.marks == "five_mark" ? "5M" : val.marks == "ten_mark" ? "10M" : val.marks == "short_key" ? "1M" : "prac"}</p></div>
                                                <div className="part-4">
                                                    {val.difficulty_level == "Easy" ? <div className="diffi-level" style={{ backgroundColor: '#d4f8e0', color: '#1E8E3E' }}> <div className="dot" style={{ backgroundColor: '#1E8E3E' }}></div> <p className="m-0" >  EASY</p></div> :
                                                        val.difficulty_level == "Medium" ? <div className="diffi-level" style={{ backgroundColor: '#fbeac9', color: '#C77700' }}> <div className="dot" style={{ backgroundColor: ' #C77700' }}></div> <p className="m-0" >MEDIUM</p></div> :
                                                            <div className="diffi-level" style={{ backgroundColor: '#f8d1d0', color: '#D32F2F' }}> <div className="dot" style={{ backgroundColor: '#D32F2F' }}></div> <p className="m-0" >  HARD</p></div>}</div>
                                                <div className="part-2"> <p className="text-success m-0">{val.topic}</p></div>
                                                <div className="part-5"><i className="ri-pencil-ai-line mx-1 icon-hover p-2" onClick={(e) => { handleEdit(val.id) }}></i><i className="ri-delete-bin-line mx-1 icon-hover p-2" onClick={() => { handleDelete(val.id) }}></i></div>
                                            </div>
                                        )
                                    }) :
                                        <div className="w-100  d-flex justify-content-center align-items-center" >
                                            <img src={NoData} style={{ width: '400px' }} className="img-fluid" alt="" />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success" onClick={() => { handlePage(currentPage - 1) }} disabled={currentPage === 1 ? "true" : ''}><i class="ri-arrow-left-double-line"></i></button>
                        {/* {new Array(totalPages).fill(0)} */}
                        <button className="btn btn-success" onClick={() => { handlePage(currentPage + 1) }} disabled={currentPage === totalPages || filterDummyPages === currentPage ? "true" : ''}><i class="ri-arrow-right-double-line"></i></button>
                    </div>
                </div>
                {/* -----------------------------------ERROR--------------------------- */}
                <div className="error" style={{ position: 'fixed', zIndex: 50 }}>
                    <p className="p-0 m-0 text-light fs-5">{error}</p>
                </div>
                {/* -------------------------------EDIT QUESTION PLUG IN-------------------------- */}
                <div className="plug-in" >
                    <div className="edit-question">
                        <form action="" onSubmit={handleEditSubmit}>
                            <div className='box rounded p-3'>
                                <div>
                                    <h3 className='' style={{ fontWeight: '700' }}>Edit Question </h3>
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
                                <div>
                                    <label htmlFor="" className="mt-3 text-success" style={{ fontSize: '13px', fontWeight: '600' }}>TOPIC</label>
                                    <input type="text" value={topic} onChange={(e) => { handleTopic(e) }} />
                                </div>
                                <div>
                                    <h4 className='mt-3' style={{ fontSize: '15px' }}><span className='text-success'><i className="ri-book-shelf-fill"></i></span>QUESTION COMPOSITION</h4>
                                    <div>
                                        <textarea rows="5" className='w-100 rounded border border-1 p-1' placeholder='Type or paste your academic question here...' value={question} onChange={handleQuestion}></textarea>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success" ref={btnRef}>Update</button>
                                    <button className="btn btn-warning" type="button" onClick={handleClose}>Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="conform-delete shadow rounded p-5 d-flex flex-column justify-content-center align-items-center">
                    <p className="m-0 p-1 " style={{ fontWeight: '600' }}>Are you sure! </p>
                    <div>
                        <button className="btn btn-success m-1 px-4" onClick={() => { tl3.current.reverse() }} >Close</button>
                        <button className="btn btn-danger  px-4 m-1" onClick={conformDelete}>Delete</button>
                    </div>
                </div>
                {/* EDIT SUCCESS */}
                <div className="edit-pop-up rounded m-1 d-flex justify-content-center align-items-center">
                    <p className="m-0" >Updated</p>
                </div>
                {/* loader */}
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
            </div >
        </>
    );
}