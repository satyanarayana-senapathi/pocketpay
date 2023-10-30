import axios from 'axios'
const BASE_URL = 'https://ms-bc-105.bootcamp64.tk/'

export const API = axios.create({
  baseURL: BASE_URL,
})
