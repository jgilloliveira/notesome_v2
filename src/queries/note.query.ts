import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PaginatedAxiosResponse } from "../models"
import { Note } from "../models/note.model"
import { connection } from "./axios.config"

export default function useGetNotes() {
  const { isLoading, data, isError } = useQuery<
    PaginatedAxiosResponse<Note>,
    AxiosError
  >(["get-notes"], () => connection.get("/notes/"))

  return {
    isGettingNotes: isLoading,
    notes: data?.data.results,
    isNotesError: isError,
  }
}
