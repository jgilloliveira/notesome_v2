import {
  Box,
  CssBaseline,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

type NotesListHeaderProps = {
  title: string
}

export default function NotesListHeader({ title }: NotesListHeaderProps) {
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ padding: 5 }}
      >
        <Typography variant="h3">{title}</Typography>
        <TextField placeholder="Buscar nota"></TextField>
      </Stack>
      <Divider />
    </Stack>
  )
}
