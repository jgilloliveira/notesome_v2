import { List } from "@mui/material"
import { Stack } from "@mui/system"
import useGetNotes from "../../queries/note.query"
import NoteItem from "./NoteItem"

export default function NotesList() {
  const { isGettingNotes, notes, isNotesError } = useGetNotes()

  return (
    <List sx={{ p: 5 }}>
      <Stack direction="row" spacing={5}>
        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </Stack>
    </List>
  )
}
