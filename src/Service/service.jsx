import axios from "axios"
const base_url = "http://localhost:8080/api/question"
export default new class serive {

    getQuestion(QuestionData) {
        return axios.get(base_url + "/");
    }
}