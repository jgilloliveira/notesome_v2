import { Paper, Stack, Typography } from "@mui/material"
import { Note } from "../../models/note.model"

type NoteItemProps = {
  note: Note
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <Paper elevation={3}>
      <Typography variant="h6">Titulo</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
        voluptatibus! Molestiae pariatur, nisi eum quae odio suscipit nemo,
        dolore debitis aspernatur ipsum omnis similique eius ipsa incidunt error
        deserunt illo.
      </Typography>
    </Paper>
  )
}
