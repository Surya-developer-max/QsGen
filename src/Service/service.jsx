import axios from "axios"
import { useParams } from "react-router-dom";
const base_url = "http://localhost:8080/api/question"
export default new class serive {

    getQuestion(QuestionData) {
        return axios.post(base_url + "/getQuestion", QuestionData);
    }
}