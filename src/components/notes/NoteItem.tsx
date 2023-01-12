import { Paper, Stack, Typography } from "@mui/material"
import { Note } from "../../models/note.model"

type NoteItemProps = {
  note: Note
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <Paper
      elevation={3}
      sx={{ width: "300px", height: "320px", padding: 3, borderRadius: "20px" }}
    >
      <Typography variant="h6">
        <strong>{note.title}</strong>
      </Typography>
      <Typography variant="body1">{note.content}</Typography>
    </Paper>
  )
}
