import { Divider, Stack } from "@mui/material"
import NotesList from "../components/notes/NotesList"
import NotesListHeader from "../components/notes/NotesListHeader"
import NotesListTabs from "../components/notes/NotesListTabs"
import { NoteFilters } from "../queries/notes.query"

type MainPageProps = {
  title: string
  filter?: NoteFilters
}
export default function MainPage({ title, filter }: MainPageProps) {
  return (
    <Stack>
      <NotesListHeader title={title} />
      {/* <NotesListTabs /> */}
      <Divider />
      <NotesList filter={filter} />
    </Stack>
  )
}
