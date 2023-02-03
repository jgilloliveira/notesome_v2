import { List } from "@mui/material"
import { Stack } from "@mui/system"
import useGetNotes, { NoteFilters } from "../../queries/notes.query"
import NoteItem from "./NoteItem"

type NotesListProps = { filter?: NoteFilters }

export default function NotesList(props?: NotesListProps) {
  const { isGettingNotes, notes, isNotesError } = useGetNotes(props)

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
