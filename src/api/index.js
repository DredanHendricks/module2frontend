import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_URL || 'http://localhost:9090'

const api = axios.create({
  baseURL: API_BASE,
})

export default api
