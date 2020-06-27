import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/api'
})

// instance.defaults.headers.post['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYwOWRjMGI4MzViNjEzOGM1MGZkZTYiLCJpYXQiOjE1OTI4MjczMjh9.gziV_FgHvKMpHf92LtTfMaXyQCZVnecyGGVsERS1tMA'
// instance.defaults.headers.get['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYwOWRjMGI4MzViNjEzOGM1MGZkZTYiLCJpYXQiOjE1OTI4MjczMjh9.gziV_FgHvKMpHf92LtTfMaXyQCZVnecyGGVsERS1tMA'

export default instance