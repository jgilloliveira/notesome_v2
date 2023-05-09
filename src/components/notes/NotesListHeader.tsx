import {
  Box,
  CssBaseline,
  Divider,
  Fab,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"

import { useState } from "react"
import { NoteFilters } from "../../queries/notes.query"
import { useSearchParams } from "react-router-dom"

type NotesListHeaderProps = {
  title: string
  filter?: NoteFilters
  onChangeSearchBar: (text: string) => void
}

export default function NotesListHeader(props: NotesListHeaderProps) {
  const [searchText, setSearchText] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  function handleAddNoteOnClick() {
    searchParams.set("noteId", "new")
    setSearchParams(searchParams)
  }

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ padding: 5 }}
      >
        <Typography variant="h3">{props.title}</Typography>
        <Stack direction="row" spacing={4}>
          <Stack direction="row">
            <IconButton onClick={() => props.onChangeSearchBar(searchText)}>
              <SearchIcon />
            </IconButton>
            <TextField
              placeholder="Buscar nota"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></TextField>
          </Stack>
          {props.filter !== "isArchived" && props.filter !== "isDeleted" && (
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleAddNoteOnClick}
            >
              <AddIcon />
            </Fab>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
