import { Stack } from "@mui/system"
import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import CloseIcon from "@mui/icons-material/Close"
import { Button, InputBase, TextField } from "@mui/material"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useGetNoteById } from "../../queries/notes.query"

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
  const [searchParams, setSearchParams] = useSearchParams()
  const { note } = useGetNoteById(searchParams.get("noteId") || "")
  const [noteTitle, setNoteTitle] = useState(note?.title)
  const [noteContent, setNoteContent] = useState(note?.content)

  useEffect(() => {
    setNoteTitle(note?.title)
    setNoteContent(note?.content)
  }, [note])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // TODO: Enviar título modificado al servidor.
      console.log("noteTitle", noteTitle)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [noteTitle])

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
            <IconButton onClick={handleDrawerClose} sx={{ mt: 2 }}>
              <CloseIcon />
            </IconButton>
            {/* Note title */}
            <InputBase
              multiline
              value={noteTitle}
              placeholder="Escribe aquí el título..."
              onChange={(e) => setNoteTitle(e.target.value)}
              inputProps={{ maxLength: 64 }}
              sx={{ py: 2, px: 1.25, fontSize: 28 }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="flex-start"
            sx={{ mt: 2 }}
          >
            <IconButton onClick={handleDrawerClose}>
              <ColorLensIcon />
            </IconButton>
            <IconButton onClick={handleDrawerClose}>
              <StarBorderIcon />
            </IconButton>
            {/* Botón guardar */}
            <Button variant="contained">Guardar</Button>
            <IconButton onClick={handleDrawerClose}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Stack>
      </DrawerHeader>
      {/* Note content */}
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
