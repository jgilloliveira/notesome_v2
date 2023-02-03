import { Refresh } from "@mui/icons-material"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { PaginatedAxiosResponse } from "../models"
import { Note } from "../models/note.model"
import { connection } from "./axios.config"

export type NoteFilters = "isFavorite" | "isArchived" | "isDeleted"
type GetPropsNotes = { filter?: NoteFilters }

function getParams(props?: GetPropsNotes) {
  return {
    ...(props?.filter === "isFavorite" && { is_favorite: "True" }),
    ...(props?.filter === "isArchived" && { is_archived: "True" }),
    ...(props?.filter === "isDeleted" && { is_deleted: "True" }),
  }
}

export default function useGetNotes(props?: GetPropsNotes) {
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
  }
}
