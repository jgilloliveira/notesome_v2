import { Stack } from "@mui/system"
import { Note } from "../../models/note.model"

type NoteDrawerProps = {
  note: Note
}

import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import CssBaseline from "@mui/material/CssBaseline"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import CloseIcon from "@mui/icons-material/Close"
import { Button, InputBase, TextField } from "@mui/material"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const drawerWidth = 768

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}))

export default function NoteDrawer() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [noteContent, setNoteContent] = useState("")

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    searchParams.delete("noteId")
    setSearchParams(searchParams)
  }

  const isOpenNoteDrawer = searchParams.get("noteId") !== null

  return (
    <Drawer
      sx={{
        width: isOpenNoteDrawer ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpenNoteDrawer}
    >
      <DrawerHeader>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Stack direction="row" alignItems="flex-start">
            <IconButton onClick={handleDrawerClose} sx={{ mt: 2.5 }}>
              <CloseIcon />
            </IconButton>
            <InputBase
              multiline
              placeholder="Escribe aquí el título..."
              inputProps={{ maxLength: 64 }}
              sx={{ py: 2, px: 1.25, fontSize: 32 }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="flex-start"
            sx={{ mt: 2.5 }}
          >
            <IconButton onClick={handleDrawerClose}>
              <ColorLensIcon />
            </IconButton>
            <IconButton onClick={handleDrawerClose}>
              <StarBorderIcon />
            </IconButton>
            <Button variant="contained">Guardar</Button>
            <IconButton onClick={handleDrawerClose}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Stack>
      </DrawerHeader>
      <Divider />
      {/* Note title */}
      <Stack flexGrow={1}>
        <ReactQuill
          theme="snow"
          value={noteContent}
          placeholder="Escribe aquí el contenido..."
          onChange={setNoteContent}
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        ></ReactQuill>
      </Stack>
    </Drawer>
  )
}
