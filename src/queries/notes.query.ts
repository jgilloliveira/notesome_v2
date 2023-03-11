import { Refresh } from "@mui/icons-material"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
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

export function useGetNotes(props?: GetNotesProps) {
  const location = useLocation()

  const { isLoading, data, isError, refetch } = useQuery<
    PaginatedAxiosResponse<Note>,
    AxiosError
  >(["get-notes"], () =>
    connection.get("/notes/", { params: getParams(props) })
  )
  useGetNoteById("3")
  useEffect(() => {
    refetch()
  }, [location])

  return {
    isGettingNotes: isLoading,
    notes: data?.data.results, // Es results ya que es paginado.
    isNotesError: isError,
    refetchNotes: refetch,
  }
}

export function useGetNoteById(id: string) {
  const queryClient = useQueryClient()
  const noteList = queryClient.getQueryData<PaginatedAxiosResponse<Note>>([
    "get-notes",
  ])
  const note = noteList?.data.results.find(
    (element) => element.id.toString() === id
  )
  if (note) {
    return { isGettingNote: false, note, isNoteError: false }
  }

  const { isLoading, data, isError } = useQuery<
    AxiosResponse<Note>,
    AxiosError
  >(["get-note-by-id"], () => connection.get(`/notes/${id}/`))

  return {
    isGettingNote: isLoading,
    note: data?.data,
    isNoteError: isError,
  }
}
