import {
  IconButton,
  Stack,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"
import { Note } from "../../models/note.model"
import { useGetUnassignedCategoriesByNoteId } from "../../queries/notes.query"

type NoteCategoriesSelectorProps = {
  note?: Note
  onClose: (close: boolean) => void
}
export default function NoteCategoriesSelector(
  props: NoteCategoriesSelectorProps
) {
  const { categories } = useGetUnassignedCategoriesByNoteId(props.note?.id)

  return (
    <Stack>
      <Dialog
        open={Boolean(props.note)}
        onClose={props.onClose}
        PaperProps={{
          sx: {
            minWidth: "350px",
            maxHeight: "500px",
          },
        }}
      >
        <DialogTitle>Categorías</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            {props.note?.categories.map((category) => (
              <Button
                sx={{
                  justifyContent: "start",
                  textTransform: "none",
                  color: "#131c20",
                  bgcolor: "#ccc",
                  "&:hover": { bgcolor: "#ccc" },
                }}
                key={category.id}
                onClick={() => {}}
                variant="text"
              >
                <Typography>{category.name}</Typography>
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}}>Crear nueva categoría</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
