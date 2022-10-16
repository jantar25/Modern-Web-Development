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

const deletePerson = (id) => {
    const deleteRequest = axios.delete(`${baseURL}/${id}`)
    return deleteRequest.then(res => res.data)
}

const updatePerson = (id, newPersonObject) => {
    const updateRequest = axios.put(`${baseURL}/${id}`, newPersonObject)
    return updateRequest.then(res => res.data)
  }


export default { getAllPersons,createPerson,deletePerson,updatePerson }