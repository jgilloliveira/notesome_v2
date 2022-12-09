import { useMutation } from "@tanstack/react-query"
import { connection } from "./axios.config"

type Credetials = {
  username: string
  password: string
}

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  isActive: boolean
}

type LoginResponse = {
  user: User
  token: string
}

export function useLogin() {
  const { isLoading, data, error, mutate } = useMutation({
    mutationFn: (credecials: Credetials) =>
      connection.post<LoginResponse>("users/login/", credecials),
    onSuccess({ data }) {
      setToken(data.token)
    },
  })
  return {
    isSenddingLogin: isLoading,
    loginData: data,
    loginError: error,
    sentLogin: mutate,
  }
}

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
