import axios from "axios"
import { useParams } from "react-router-dom";
const base_url = "https://qsgeneraterbackend-2.onrender.com/api/question"
// const base_url = "http://localhost:8080/api/question"
export default new class serive {

    getQuestion(QuestionData) {
        return axios.post(base_url + "/getQuestion", QuestionData);
    }
    getAllQuestion(QuestionData) {
        return axios.get(base_url + "/getAllQuestion")
    }
    addBulkQuestions(QuestionData) {
        console.log()
        return axios.post(`${base_url}/addBulkQuestion`, QuestionData)
    }
    addQuestion(QuestionData) {
        return axios.post(`${base_url}/addQuestion`, QuestionData)
    }
    deleteQuestion(id) {
        return axios.delete(`${base_url}/deleteQuestion/` + id)
    }
    editQustion(QuestionData, id) {
        return axios.put(`${base_url}/editQuestion` + id, QuestionData)
    }
    getQuestionById(id) {
        return axios.get(`${base_url}/getQuestionById/` + id)
    }
    getTopicsOnly() {
        return axios.get(`${base_url}/getTpoicsOnly`)
    }
    deleteAllQustion() {
        return axios.delete(`${base_url}/deleteAllQuestions`)
    }
    deleteByIds(ids) {
        console.log(ids)
        return axios.delete(`${base_url}/deleteByIds`, {
            data: ids,
            headers: {
                "Content-Type": "application/json",
            }
        })
    }

}