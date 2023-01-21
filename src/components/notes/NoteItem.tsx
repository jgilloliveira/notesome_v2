import { Badge, Chip, Paper, Stack, Typography } from "@mui/material"
import { Note } from "../../models/note.model"
import { format } from "date-fns"

type NoteItemProps = {
  note: Note
}

function dateFormat(date: string) {
  const formatedDate = format(new Date(date), "MMM dd, yyyy")
  return formatedDate[0].toUpperCase() + formatedDate.substring(1)
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "300px",
        height: "320px",
        padding: 3,
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption">
          {dateFormat(note.creationDate)}
        </Typography>
        <Stack direction="row">
          {note.categories.length > 0 && (
            <Chip
              label={note.categories[0].name}
              sx={{
                maxWidth: "100px",
                border: "2px solid #FFF",
                mr: "-10px",
                zIndex: 100,
                bgcolor: "#DDD",
              }}
            />
          )}
          {note.categories.length > 1 && (
            <Chip
              label={`+${note.categories.length - 1}`}
              sx={{ border: "2px solid #FFF", bgcolor: "#DDD" }}
            />
          )}
        </Stack>
      </Stack>
      <Typography variant="h6" sx={{ textAlign: "left" }}>
        {note.title}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "left" }}>
        {note.content}
      </Typography>
    </Paper>
  )
}
