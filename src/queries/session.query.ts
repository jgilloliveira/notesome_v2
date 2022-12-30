import { useMutation } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"
import { connection } from "./axios.config"
import { formatErrorResponse } from "./utils"

type Credetials = {
  username: string
  password: string
}

type RegisterData = {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirm: string
}

type ServerError<T> = {
  error: string
} & T

type AxiosServerError<T> = AxiosError<ServerError<T>>

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
  const { isLoading, data, error, mutate } = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosServerError<Credetials>,
    Credetials
  >((credecials) => connection.post("users/login/", credecials), {
    onSuccess({ data }) {
      setToken(data.token)
    },
  })
  return {
    isSenddingLogin: isLoading,
    loginData: data?.data,
    loginError: error?.response?.data,
    sendLogin: mutate,
  }
}

export function useRegister() {
  const { isLoading, data, error, mutate } = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosServerError<RegisterData>,
    RegisterData
  >((userData) => connection.post("users/register/", userData), {
    onSuccess({ data }) {
      setToken(data.token)
    },
  })

  return {
    isSenddingRegister: isLoading,
    registerData: data?.data,
    registerError: error?.response?.data,
    sendRegister: mutate,
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
