import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const deleteRequest = await axios.delete(`${baseUrl}/${id}`, config)
  return deleteRequest
}

const updateBlog = async (id, newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const updateRequest = await axios.put(
    `${baseUrl}/${id}`,
    newBlogObject,
    config
  )
  return updateRequest.data
}

const blogService = { getAll, create, setToken, deleteBlog, updateBlog }

export default blogService
