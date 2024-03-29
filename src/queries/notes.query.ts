import { Refresh } from "@mui/icons-material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { PaginatedAxiosResponse } from "../models"
import { Note } from "../models/note.model"
import { connection } from "./axios.config"
import { Category } from "../models/category.model"

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
  >(["notes"], () => connection.get("/notes/", { params: getParams(props) }))

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

export function useGetNoteById(id?: string) {
  const queryClient = useQueryClient()
  const noteList = queryClient.getQueryData<PaginatedAxiosResponse<Note>>([
    "notes",
  ])
  const localNote = noteList?.data.results.find(
    (element) => element.id.toString() === id
  )

  // Ver como ejecutar siempre los hooks en un hooks...
  const { isLoading, data, isError, refetch } = useQuery<
    AxiosResponse<Note>,
    AxiosError
  >(["note", id?.toString()], () => connection.get(`/notes/${id}/`), {
    enabled: Boolean(id) && !localNote && id !== "new",
  })

  if (localNote && id !== "new") {
    return {
      isGettingNote: false,
      note: localNote,
      isNoteError: false,
      refetchNoteById: refetch,
    }
  }

  return {
    isGettingNote: isLoading,
    note: data?.data,
    isNoteError: isError,
    refetchNoteById: refetch,
  }
}

export function useUpdateNoteById(id?: string) {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, isLoading, isError } = useMutation<
    AxiosResponse<Note>,
    AxiosError,
    Partial<Note & { newCategories: string[] }>
  >((note) => connection.patch(`/notes/${id}/`, note), {
    onSuccess(data) {
      queryClient.setQueriesData<PaginatedAxiosResponse<Note>>(
        ["notes"],
        (oldNotes) => {
          if (!oldNotes) return oldNotes
          const results = oldNotes.data.results.map((note) =>
            note.id.toString() === id ? data.data : note
          )
          return {
            ...oldNotes,
            data: {
              ...oldNotes.data,
              results,
            },
          }
        }
      )
    },
  })

  return {
    updateNote: mutateAsync,
    isUpdatingNote: isLoading,
    isUpdateNoteError: isError,
  }
}

export function useGetUnassignedCategoriesByNoteId(id?: string) {
  const { data, isLoading, error, isError, refetch } = useQuery<
    AxiosResponse<Category[]>,
    AxiosError
  >(
    ["unassigned-categories", id],
    () => connection.get(`notes/${id}/unassigned_categories/`),
    { enabled: Boolean(id) }
  )

  return {
    unassignedCategories: data?.data,
    categoriesError: error?.response?.data,
    isGettingUnassignedCategoriesByNoteId: isLoading,
    isGettingUnassignedCategoriesByNoteIdError: isError,
    refetchUnassignedCategoriesByNoteId: refetch,
  }
}

export function useCreateNote() {
  const { mutateAsync, isError, isLoading } = useMutation<
    AxiosResponse<Note>,
    AxiosError,
    Partial<Note>
  >((note) => connection.post(`/notes/`, note))

  return {
    createNote: mutateAsync,
    isCreateNoteError: isError,
    isCreatingNote: isLoading,
  }
}
