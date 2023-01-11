import { useQuery } from "@tanstack/react-query"
import { connection } from "./axios.config"
import { Category } from "../models/category.model"
import { AxiosError, AxiosResponse } from "axios"
import { PaginatedAxiosResponse } from "../models"
import { useState } from "react"

export function useGetCategories() {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [page, setPage] = useState(1)
  const { isLoading, data, isError } = useQuery<
    PaginatedAxiosResponse<Category>,
    AxiosError
  >(
    ["get-categories", page],
    () => connection.get("categories/?page=" + page),
    {
      onSuccess(data) {
        const ids = data.data.results.map((category) => category.id)

        const oldCategories = categoryList.filter(
          (category) => !ids.includes(category.id)
        )

        setCategoryList([...oldCategories, ...data.data.results])
      },
    }
  )

  function loadNextCategoriesPage() {
    setPage(page + 1)
  }

  return {
    isGettingCategories: isLoading,
    categories: categoryList,
    isCategoriesError: isError,
    loadNextCategoriesPage,
    hasCategoriesNextPage: Boolean(data?.data.next),
  }
}
