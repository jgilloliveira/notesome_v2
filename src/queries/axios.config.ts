import axios from "axios"
import { formatErrorResponse } from "./utils"

const BASE_URL = "http://localhost:8000/api/"

export const connection = axios.create({
  baseURL: BASE_URL,
})

axios.interceptors.response.use(
  (response) => response,
  (error) => formatErrorResponse(error)
  //throw new Error(formatErrorResponse(error))
)
