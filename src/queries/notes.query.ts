import { Refresh } from "@mui/icons-material"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { PaginatedAxiosResponse } from "../models"
import { Note } from "../models/note.model"
import { connection } from "./axios.config"

export type NoteFilters = "isFavorite" | "isArchived" | "isDeleted"

export type GetNotesProps = {
  filter?: NoteFilters
  categoryIdFilter?: string
  searchText?: string
}

function getParams(props?: GetNotesProps) {
  return {
    ...(props?.filter === "isFavorite" && { is_favorite: "True" }),
    ...(props?.filter === "isArchived"
      ? { is_archived: "True" }
      : { is_archived: "False" }),
    ...(props?.filter === "isDeleted"
      ? { is_deleted: "True" }
      : { is_deleted: "False" }),
    ...(props?.categoryIdFilter && {
      categories: props?.categoryIdFilter,
    }),
    ...(props?.searchText && { search: props?.searchText }),
  }
}

export default function useGetNotes(props?: GetNotesProps) {
  const location = useLocation()

  const { isLoading, data, isError, refetch } = useQuery<
    PaginatedAxiosResponse<Note>,
    AxiosError
  >(["get-notes"], () =>
    connection.get("/notes/", { params: getParams(props) })
  )

  useEffect(() => {
    refetch()
  }, [location])

  return {
    isGettingNotes: isLoading,
    notes: data?.data.results,
    isNotesError: isError,
    refetchNotes: refetch,
  }
}
