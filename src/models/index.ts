import { AxiosResponse } from "axios"

export type PaginatedAxiosResponse<T> = AxiosResponse<{
  count: number
  next?: string
  previous?: string
  results: T[]
}>
