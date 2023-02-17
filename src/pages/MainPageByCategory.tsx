import { Divider, Stack, TextField, Typography } from "@mui/material"
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
  const [searchNoteText, setSearchNoteText] = useState("")
  const { refetchNotes } = useGetNotes({
    filter: noteFilter,
    categoryIdFilter: categoryId,
    searchText: searchNoteText,
  })

  useEffect(() => {
    refetchNotes()
  }, [noteFilter, searchNoteText])

  function handleOnChangeTabs(filter: NoteFilters | undefined) {
    setNoteFilter(filter)
  }
  // TODO: Pasar noteText a NoteList
  return category ? (
    <Stack>
      <NotesListHeader
        title={category.name}
        onChangeSearchBar={(text) => setSearchNoteText(text)}
      />
      <NotesListTabs onChange={handleOnChangeTabs} />
      <Divider />
      <NotesList
        filter={noteFilter}
        categoryIdFilter={categoryId}
        searchText={searchNoteText}
      />
    </Stack>
  ) : (
    <></>
  )
}
