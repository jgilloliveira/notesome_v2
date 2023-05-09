import { Badge, Chip, Paper, Stack, Typography } from "@mui/material"
import { Note } from "../../models/note.model"
import { format } from "date-fns"
import StarIcon from "@mui/icons-material/Star"
import { shadeColor } from "../../utils/colors.util"
import { useNavigate, useSearchParams } from "react-router-dom"
import parseToHtml from "html-react-parser"
import ChipNoteCategoryList from "../categories/ChipNoteCategoryList"

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
        mb: "40px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          {dateFormat(note.creationDate)}
        </Typography>
        {note.isFavorite && <StarIcon sx={{ color: "gold", mb: "2px" }} />}
        <Stack direction="row">
          <ChipNoteCategoryList noteId={note.id} maxLen={1} overlap dense />
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
