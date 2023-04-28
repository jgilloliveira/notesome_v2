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
import {
  useGetNoteById,
  useGetUnassignedCategoriesByNoteId,
  useUpdateNoteById,
} from "../../queries/notes.query"
import { Category } from "../../models/category.model"
import { useCallback, useEffect, useState } from "react"

type NoteCategoriesSelectorProps = {
  noteId?: string
  onClose: (close: boolean) => void
}

export default function NoteCategoriesSelector(
  props: NoteCategoriesSelectorProps
) {
  const { updateNote } = useUpdateNoteById(props.noteId)
  const { note, refetchNoteById } = useGetNoteById(props.noteId)

  const { unassignedCategories, refetchUnassignedCategoriesByNoteId } =
    useGetUnassignedCategoriesByNoteId(props.noteId)

  const categories = useCallback(
    () => [...(note?.categories || []), ...(unassignedCategories || [])],
    [unassignedCategories, note]
  )
  // const [categories, setCategories] = useState([
  //   ...(note?.categories || []),
  //   ...(unassignedCategories || []),
  // ])
  const assignedCategoriesId = useCallback(
    () => note?.categories.map((category) => category.id) || [],
    [note]
  )
  // useState(
  //   note?.categories.map((category) => category.id) || []
  // )

  // useEffect(() => {
  //   setCategories([
  //     ...(note?.categories || []),
  //     ...(unassignedCategories || []),
  //   ])
  // }, [unassignedCategories])

  async function onToggleCategory(category: Category) {
    const isInNote = assignedCategoriesId().includes(category.id)
    let newAssignedCategoriesId = [...assignedCategoriesId()]
    if (isInNote)
      newAssignedCategoriesId = newAssignedCategoriesId.filter(
        (id) => id.toString() !== category.id.toString()
      )
    else newAssignedCategoriesId = [...newAssignedCategoriesId, category.id]
    // setAssignedCategoriesId(newAssignedCategoriesId)
    // TODO: Arreglar bug cuando se agrega o se quita categorias, no impacta bien en el componente.
    await updateNote({ newCategories: newAssignedCategoriesId })
    if (refetchNoteById) await refetchNoteById()
    refetchUnassignedCategoriesByNoteId()
  }

  return (
    <Stack>
      <Dialog
        open={Boolean(props.noteId)}
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
            {categories()?.map((category) => {
              const isInNote = assignedCategoriesId().includes(category.id)
              return (
                <Button
                  sx={{
                    justifyContent: "start",
                    textTransform: "none",
                    color: "#131c20",
                    bgcolor: isInNote ? "#ccc" : undefined,
                    "&:hover": { bgcolor: isInNote ? "#ccc" : "transparent" },
                  }}
                  key={category.id}
                  onClick={() => onToggleCategory(category)}
                  variant="text"
                >
                  <Typography>{category.name}</Typography>
                </Button>
              )
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}}>Crear nueva categoría</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
