import { Box, Stack, TextField, Typography } from "@mui/material"

type NotesListHeaderProps = {
  title: string
}

export default function NotesListHeader({ title }: NotesListHeaderProps) {
  return (
    <Stack>
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography>{title}</Typography>
        <TextField placeholder="Buscar nota"></TextField>
      </Stack>
    </Stack>
  )
}
