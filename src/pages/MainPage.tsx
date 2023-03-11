import { Divider, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import NotesList from "../components/notes/NotesList"
import NotesListHeader from "../components/notes/NotesListHeader"
import NotesListTabs from "../components/notes/NotesListTabs"
import { useGetNotes, NoteFilters } from "../queries/notes.query"

type MainPageProps = {
  title: string
  filter?: NoteFilters
}
export default function MainPage({ title, filter }: MainPageProps) {
  const [searchNoteText, setSearchNoteText] = useState("")

  const { refetchNotes } = useGetNotes({
    filter,
    searchText: searchNoteText,
  })

  useEffect(() => {
    refetchNotes()
  }, [searchNoteText])

  return (
    <Stack>
      <NotesListHeader
        title={title}
        onChangeSearchBar={(text) => setSearchNoteText(text)}
      />
      <Divider />
      <NotesList filter={filter} searchText={searchNoteText} />
    </Stack>
  )
}
