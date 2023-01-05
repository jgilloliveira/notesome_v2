import { useQuery } from "@tanstack/react-query"
import { connection } from "./axios.config"
import { Category } from "../models/category.model"
import { AxiosError, AxiosResponse } from "axios"
import { PaginatedAxiosResponse } from "../models"

export function useGetCategories() {
  const { isLoading, data, isError } = useQuery<
    PaginatedAxiosResponse<Category>,
    AxiosError
  >(["get-categories"], () => connection.get("categories/"))

  return {
    isGettingCategories: isLoading,
    categories: data?.data.results,
    isCategoriesError: isError,
  }
}
