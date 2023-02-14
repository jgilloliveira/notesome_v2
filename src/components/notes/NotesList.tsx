import { List } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect } from "react"
import useGetNotes, { GetNotesProps } from "../../queries/notes.query"
import NoteItem from "./NoteItem"

type NotesListProps = GetNotesProps & {
  onCreate?: (refetchNotesFn: Function) => void
}

export default function NotesList(props?: NotesListProps) {
  const { notes, refetchNotes } = useGetNotes(props)

  useEffect(() => {
    if (props?.onCreate) props?.onCreate(refetchNotes)
  }, [])

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
