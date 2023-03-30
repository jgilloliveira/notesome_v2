import { Badge, Chip, Paper, Stack, Typography } from "@mui/material"
import { Note } from "../../models/note.model"
import { format } from "date-fns"
import StarIcon from "@mui/icons-material/Star"
import { shadeColor } from "../../utils/colors.util"
import { useNavigate, useSearchParams } from "react-router-dom"
import parseToHtml from "html-react-parser"

type NoteItemProps = {
  note: Note
}

function dateFormat(date: string) {
  const formatedDate = format(new Date(date), "MMM dd, yyyy")
  return formatedDate[0].toUpperCase() + formatedDate.substring(1)
}

/* Recordar que sería interesante probar mostrar
todas las categorías debajo del contenido de la nota */

export default function NoteItem({ note }: NoteItemProps) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  function handleNoteOnClick() {
    console.log("Onclick paper")
    searchParams.set("noteId", note.id)
    setSearchParams(searchParams)
  }
  return (
    <Paper
      elevation={3}
      onClick={handleNoteOnClick}
      sx={{
        width: "300px",
        height: "320px",
        padding: 3,
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: note.color,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          {dateFormat(note.creationDate)}
        </Typography>
        {note.isFavorite && <StarIcon sx={{ color: "gold", mb: "2px" }} />}
        <Stack direction="row">
          {note.categories.length > 0 && (
            <Chip
              label={note.categories[0].name}
              sx={{
                maxWidth: "100px",
                border: `2px solid ${note.color}`,
                mr: "-10px",
                zIndex: 100,
                bgcolor: shadeColor(note.color, -10),
              }}
            />
          )}
          {note.categories.length > 1 && (
            <Chip
              label={`+${note.categories.length - 1}`}
              sx={{
                border: `2px solid ${note.color}`,
                bgcolor: shadeColor(note.color, -10),
              }}
            />
          )}
        </Stack>
      </Stack>
      <Typography variant="h6" sx={{ textAlign: "left" }}>
        {note.title}
      </Typography>
      {/* <Typography variant="body1" sx={{ textAlign: "left" }}> */}
      <Stack
        sx={{
          "& > p": { m: 0 },
        }}
      >
        {parseToHtml(` ${note.content}`)}
      </Stack>

      {/* </Typography> */}
    </Paper>
  )
}
