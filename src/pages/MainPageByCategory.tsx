import { Divider, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NotesList from "../components/notes/NotesList"
import NotesListHeader from "../components/notes/NotesListHeader"
import NotesListTabs from "../components/notes/NotesListTabs"
import { useGetCategoryById } from "../queries/categories.query"
import useGetNotes, { NoteFilters } from "../queries/notes.query"
import MainPage from "./MainPage"

export default function MainPageByCategory() {
  const { categoryId } = useParams()
  const { category } = useGetCategoryById(categoryId)
  const [noteFilter, setNoteFilter] = useState<NoteFilters | undefined>(
    undefined
  )
  const { refetchNotes } = useGetNotes({
    filter: noteFilter,
    categoryIdFilter: categoryId,
  })

  useEffect(() => {
    refetchNotes()
  }, [noteFilter])

  function handleOnChangeTabs(filter: NoteFilters | undefined) {
    setNoteFilter(filter)
  }

  return category ? (
    <Stack>
      <NotesListHeader title={category.name} />
      <NotesListTabs onChange={handleOnChangeTabs} />
      <Divider />
      <NotesList filter={noteFilter} categoryIdFilter={categoryId} />
    </Stack>
  ) : (
    <></>
  )
}
