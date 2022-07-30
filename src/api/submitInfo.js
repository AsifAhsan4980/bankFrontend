import axios from "axios"

const postBlog = (data) => {
    console.log('fadf::', data)
    return axios.post(`http://localhost:80/cardInfo/`, data, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        }
    })
}

export default postBlog