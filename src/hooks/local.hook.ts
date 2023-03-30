import { useQueryClient } from "@tanstack/react-query"
import { PaginatedAxiosResponse } from "../models"
import { Note } from "../models/note.model"

/**
 * Solo para listas
 */
export function useUpdateLocalQueriesData<
  T extends object,
  D extends { id: string }
>(
  queryKey: string[],
  newData: D,
  getter: (previousData: T) => D[],
  setter: (list: D[], previousData: T) => T
  // formatter: (previousData: T) => T
) {
  const queryClient = useQueryClient()

  queryClient.setQueriesData(queryKey, (previousData: any) => {
    if (!previousData) return previousData

    const results = getter(previousData).map((element) =>
      `${element.id}` === `${newData.id}` ? newData : element
    )

    return setter(results, previousData)
  })
}

const newNote: Note = {
  id: "1",
  color: "",
  categories: [],
  content: "",
  creationDate: "",
  isDeleted: false,
  isFavorite: false,
  title: "",
}

useUpdateLocalQueriesData<PaginatedAxiosResponse<Note>, Note>(
  ["notes"],
  newNote,
  (previousData) => previousData.data.results,
  (newList, previousData) => ({
    ...previousData,
    data: { ...previousData.data, results: newList },
  })
)
