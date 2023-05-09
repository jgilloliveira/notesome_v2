import { Chip, Stack } from "@mui/material"
import { Note } from "../../models/note.model"
import { shadeColor } from "../../utils/colors.util"
import { useGetNoteById } from "../../queries/notes.query"
import { useEffect } from "react"

type ChipNoteCategoryListProps = {
  noteId: string
  maxLen?: number
  overlap?: boolean
  dense?: boolean
}
export default function ChipNoteCategoryList(props: ChipNoteCategoryListProps) {
  const { note, refetchNoteById } = useGetNoteById(props.noteId)
  const categories = note?.categories.slice(0, props.maxLen) || []
  const amountLeft = (note?.categories.length || 0) - categories.length

  return !note ? (
    <></>
  ) : (
    <Stack direction="row">
      {categories.length > 0 &&
        categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            sx={{
              maxWidth: props.dense ? "100px" : "auto",
              border: `2px solid ${note.color}`,
              mr: props.overlap ? "-10px" : "",
              zIndex: 100,
              bgcolor: shadeColor(note.color, -10),
            }}
          />
        ))}

      {amountLeft > 0 && (
        <Chip
          label={`+${amountLeft}`}
          sx={{
            border: `2px solid ${note.color}`,
            bgcolor: shadeColor(note.color, -10),
          }}
        />
      )}
    </Stack>
  )
}
