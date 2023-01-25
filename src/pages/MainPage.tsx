import { Stack } from "@mui/material"
import NotesList from "../components/notes/NotesList"
import NotesListHeader from "../components/notes/NotesListHeader"
import NotesListTabs from "../components/notes/NotesListTabs"

type MainPageProps = {
  title: string
}
export default function MainPage({ title }: MainPageProps) {
  return (
    <Stack>
      <NotesListHeader title={title} />
      <NotesListTabs />
      <NotesList />
    </Stack>
  )
}
