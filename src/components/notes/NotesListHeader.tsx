import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"

type NotesListHeaderProps = {
  title: string
  onChangeSearchBar: (text: string) => void
}

export default function NotesListHeader(props: NotesListHeaderProps) {
  const [searchText, setSearchText] = useState("")
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ padding: 5 }}
      >
        <Typography variant="h3">{props.title}</Typography>
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
      </Stack>
    </Stack>
  )
}
