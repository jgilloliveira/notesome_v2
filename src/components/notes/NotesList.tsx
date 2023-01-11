import { List } from "@mui/material"
import { Stack } from "@mui/system"
import NoteItem from "./NoteItem"

export default function NotesList() {
  return (
    <Stack>
      <List>
        <NoteItem />
      </List>
    </Stack>
  )
}
