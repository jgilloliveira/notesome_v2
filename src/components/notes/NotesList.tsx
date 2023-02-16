import { List } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect } from "react"
import useGetNotes, { GetNotesProps } from "../../queries/notes.query"
import NoteItem from "./NoteItem"

type NotesListProps = GetNotesProps

export default function NotesList(props?: NotesListProps) {
  const { notes } = useGetNotes(props)

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
