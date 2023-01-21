import { Stack } from "@mui/material"
import NotesList from "../components/notes/NotesList"
import NotesListHeader from "../components/notes/NotesListHeader"

export default function HomePage() {
  return (
    <Stack>
      <NotesListHeader title="Home" />
      <NotesList />
    </Stack>
  )
}
