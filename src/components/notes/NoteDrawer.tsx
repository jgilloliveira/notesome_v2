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
  const [noteContent, setNoteContent] = useState("")

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
            <Stack direction="row" spacing={1}>
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
          <InputBase
            multiline
            placeholder="Escribe aquí el título..."
            sx={{ py: 2, px: 1.25, fontSize: 32 }}
          />
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
    </Box>
  )
}
