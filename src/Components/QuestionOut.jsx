import Futogen_logo from '../assets/futogen_logo.png';
import waterMark from '../assets/waterMark.jpeg'
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function QuestionOut() {
    const location = useLocation();
    const { data, local_question_details } = location.state || {};
    const [isLoading, setIsLoading] = useState(true)

    const printRef = useRef();
    const [two_mark, setTwo_marks] = useState();
    const [ten_mark, setTen_mark] = useState();
    const [five_mark, setfive_mark] = useState();
    const [prac_question, setPrac_Question] = useState();
    const [short_key, setShort_key] = useState();

    if (!data || !local_question_details) {
        return <h2>No Data Found</h2>;
    }
    setTimeout(() => {
        setIsLoading(false)
    }, 2000);

    const roman = ["I", "II", "III", "IV", "V"];
    let sectionIndex = 0;

    const now = new Date();
    const date = (now.getDate() < 10 ? "0" + now.getDate() : now.getDate());
    const month = (now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1));
    const year = (now.getFullYear());
    const time = `${now.getHours()}:${now.getMinutes()}`



    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = 210;
        const pdfHeight = 297;
        const margin = 10;

        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth - margin * 2;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", margin, position + margin, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", margin, position + margin, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`FCE_${local_question_details.course_name}_${date}${month}${year}${time}`);
    };
    function handlePrint() {
        window.print();
    }

    return (
        <>
            {/* -----------------------------DOWNLODE AND PRINT BUTTONS------------------------------- */}

            <div className='question-paper-main-container'>
                <div className='w-100  d-flex p-3 m-1 '>
                    <div className='ms-auto'>
                        <i className="mx-1 btn btn-success d-p-icon ri-download-2-line " onClick={() => { handleDownloadPdf() }}></i>
                        <i className="mx-1 btn btn-success d-p-icon ri-printer-line " onClick={handlePrint}></i>
                    </div>
                </div>
                {isLoading ?
                    <div className='d-flex justify-content-center align-items-center' style={{width:'100%',height:'500px'}}>
                        <div class="book">
                            <div class="book__pg-shadow"></div>
                            <div class="book__pg"></div>
                            <div class="book__pg book__pg--2"></div>
                            <div class="book__pg book__pg--3"></div>
                            <div class="book__pg book__pg--4"></div>
                            <div class="book__pg book__pg--5"></div>
                        </div>
                    </div> : <div className='Qs-container'>

                        <div className='question_paper border position-relative' ref={printRef}>
                            {/*    ---------------------------------------------- WATER MARK--------------------------------- */}
                            <div className='waterMark'>
                                <img src={waterMark} alt="" />
                            </div>
                            {/* -----------------------------------------------------MAIN LOGO----------------------------- */}
                            <div className=''>
                                <center><img src={Futogen_logo} alt="" className='futogen-logo' /></center>
                            </div>

                            {/* --------------------------HEADER PART----------------------- */}
                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                <table className='question-paper-table mt-' style={{ width: '100%' }} >
                                    <thead>
                                        <tr >
                                            <th className='text-center'><b>C</b></th>
                                            <th className='text-center'>Computer Basic & Internet Class</th>
                                            <th className='p-1'>Total Marks:{local_question_details.total_mark} <br /> Date:{`${date}/${month}/${year}`}</th>
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

                            {/* -----------------------QUESTION PAPER PART---------------------------------- */}
                            <div className='d-flex justify-content-center align-items-center flex-column '>

                                {/* ------------------------------------SHORTCUT KEY MARK PART-------------------------------------- */}
                                <div className="section">
                                    {local_question_details?.short_key != 0 ? <div style={{ width: '100%' }} >
                                        <div className=' d-flex justify-content-between' >
                                            <div className='d-flex'>
                                                <p className='mx-1 m-0 my-1'><b>{roman[sectionIndex++]}</b></p><p className='ms-3 m-0 my-1'><b> Answer the Shortcut Keys (any {local_question_details.short_key}):-</b></p>
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
                                                            <td style={{ width: '200px' }}><p className='p-0 ms-2 m-0'>{val}</p></td>
                                                            <td ></td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div> : ""}
                                </div>
                                {/* ------------------------------------TWO MARK PART-------------------------------------- */}

                                <div className="section">
                                    {local_question_details?.two_mark != 0 ? <div style={{ width: '100%' }}>
                                        <div className=' d-flex justify-content-between' >
                                            <div className='d-flex'>
                                                <p className='mx-1 m-0 my-1'><b>{roman[sectionIndex++]}</b></p><p className='mx-1 m-0 my-1'><b> Answer the Questions (any {local_question_details.two_mark}) :-</b></p>
                                            </div>
                                            <div>
                                                <p className='mx-1 m-0 my-1'><b>{local_question_details.two_mark}X2={local_question_details.two_mark * 2}</b></p>
                                            </div>
                                        </div>
                                        {data.two_mark.map((val, inx) => {
                                            return (
                                                <div key={inx}>
                                                    <div className='d-flex'>
                                                        <p className='p-0 mx-1 m-0'>{inx + 1}.</p><p className='p-0 ms-2 m-0'>{val}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div> : ""}
                                </div>
                                {/* ------------------------------------FIVE MARK PART-------------------------------------- */}


                                <div className='section'>
                                    {local_question_details.five_mark != 0 ? <div style={{ width: '100%' }}>
                                        <div className='  d-flex justify-content-between' >
                                            <div className='d-flex'>
                                                <p className='mx-1 m-0 my-1'><b>{roman[sectionIndex++]}</b></p><p className='mx-1 m-0 my-1'><b> Answer the Questions (any {local_question_details.five_mark}):- </b></p>
                                            </div>
                                            <div>
                                                <p className='mx-1 m-0 my-1'><b>{local_question_details.five_mark}X5={local_question_details.five_mark * 5}</b></p>
                                            </div>
                                        </div>

                                        <div style={{ width: "90%" }}>
                                            {data.five_mark.map((val, inx) => {
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
                                </div>
                                {/* ------------------------------------TEN MARK PART-------------------------------------- */}

                                <div className='section'>
                                    {local_question_details.ten_mark != 0 ?
                                        <div style={{ width: '100%' }}>
                                            <div className=' d-flex justify-content-between' >
                                                <div className='d-flex'>
                                                    <p className='mx-1 m-0 my-1'><b>{roman[sectionIndex++]}</b></p><p className='mx-1 m-0 my-1'><b> Answer the Questions (any {local_question_details.ten_mark}):- </b></p>
                                                </div>
                                                <div>
                                                    <p className='mx-1 m-0 my-1'><b>{local_question_details.ten_mark}X10={local_question_details.ten_mark * 10}</b></p>
                                                </div>
                                            </div>
                                            <div style={{ width: "90%" }}>
                                                {data.ten_mark.map((val, inx) => {
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

                                {/* ------------------------------------PRAC MARK PART-------------------------------------- */}

                                <div className='section'>
                                    {local_question_details.prac > local_question_details.prac ?
                                        <div style={{ width: '100%' }}>
                                            <div className='   d-flex justify-content-between' >
                                                <div className='d-flex'>
                                                    <p className='mx-1 m-0 my-1'><b>{roman[sectionIndex++]}</b></p><p className='mx-1 m-0 my-1'><b> Pratical (any {local_question_details.prac}):- </b></p>
                                                </div>
                                                <div>
                                                    <p className='mx-1 m-0 my-1'><b>{local_question_details.prac}X10={local_question_details.prac * 10}</b></p>
                                                </div>
                                            </div>

                                            <div style={{ width: "90%" }}>
                                                {data.prac.map((val, inx) => {
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
                                <div className='fotter mt-5 d-flex justify-content-center align-items-center'>
                                    <p className='m-0 text-white '>This Question Paper Generated on {`${date}/${month}/${year}_${time}`}</p>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center w-100 mt-4 ' >
                            <div className='Buttons d-flex justify-content-between'>
                                <button onClick={() => { handleDownloadPdf() }} className='download-btn '><span><i class="ri-download-2-line"></i></span>Download</button>
                                <button className='download-btn ' onClick={handlePrint}><span><i class="ri-printer-line"></i></span> Print</button>
                            </div>
                        </div>
                    </div>}


            </div>
        </>
    );
}