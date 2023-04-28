import { Chip, Stack } from "@mui/material"
import { Note } from "../../models/note.model"
import { shadeColor } from "../../utils/colors.util"

type ChipNoteCategoryListProps = {
  note: Note
  maxLen?: number
  overlap?: boolean
  dense?: boolean
}
export default function ChipNoteCategoryList(props: ChipNoteCategoryListProps) {
  const categories = props.note.categories.slice(0, props.maxLen)
  const amountLeft = props.note.categories.length - categories.length
  return (
    <Stack direction="row">
      {categories.length > 0 &&
        categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            sx={{
              maxWidth: props.dense ? "100px" : "auto",
              border: `2px solid ${props.note.color}`,
              mr: props.overlap ? "-10px" : "",
              zIndex: 100,
              bgcolor: shadeColor(props.note.color, -10),
            }}
          />
        ))}

      {amountLeft > 0 && (
        <Chip
          label={`+${amountLeft}`}
          sx={{
            border: `2px solid ${props.note.color}`,
            bgcolor: shadeColor(props.note.color, -10),
          }}
        />
      )}
    </Stack>
  )
}
