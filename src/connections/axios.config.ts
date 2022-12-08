import axios from "axios"

const BASE_URL = "http://localhost:8000/api/"

export const connection = axios.create({
  baseURL: BASE_URL,
})

export function setToken(token: string) {
  localStorage.setItem("token", token)
  connection.defaults.headers.common["Authorization"] = `Token ${token}`
}

export function loadSession() {
  const token = localStorage.getItem("token")
  if (token)
    connection.defaults.headers.common["Authorization"] = `Token ${token}`
}

export function logout() {
  connection.defaults.headers.common["Authorization"] = ""
  localStorage.removeItem("token")
}

export function isLogged() {
  return Boolean(connection.defaults.headers.common["Authorization"])
}
