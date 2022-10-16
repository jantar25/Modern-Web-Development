import axios from 'axios'


const baseURL = "http://localhost:3001/persons"

const getAllPersons = () => {
    const getRequest = axios.get(baseURL)
    return getRequest.then(res => res.data)
}

const createPerson = (personObject) => {
    const postRequest = axios.post( baseURL,personObject )
    return postRequest.then(res => res.data)
}


export default { getAllPersons,createPerson }