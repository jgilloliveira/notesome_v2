import { useMutation } from "@tanstack/react-query"
import { connection } from "./axios.config"

type Credetials = {
  username: string
  password: string
}

export function useLogin() {
  const { isLoading, data, error, mutate } = useMutation({
    mutationFn: (credecials: Credetials) =>
      connection.post("/login", credecials),
  })
  return {
    isSenddingLogin: isLoading,
    loginData: data,
    loginError: error,
    sentLogin: mutate,
  }
}
