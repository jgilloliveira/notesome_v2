import {
  Box,
  CssBaseline,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"

type NotesListHeaderProps = {
  title: string
  searchNoteText: string
  onChangeSearchBar: (text: string) => void
}

export default function NotesListHeader(props: NotesListHeaderProps) {
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ padding: 5 }}
      >
        <Typography variant="h3">{props.title}</Typography>
        <TextField
          placeholder="Buscar nota"
          value={props.searchNoteText}
          onChange={(e) => props.onChangeSearchBar(e.target.value)}
        ></TextField>
      </Stack>
    </Stack>
  )
}
