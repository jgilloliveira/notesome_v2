import { Stack } from "@mui/system"
import { styled, useTheme } from "@mui/material/styles"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import CloseIcon from "@mui/icons-material/Close"
import { Button, Divider, InputBase, TextField } from "@mui/material"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import StarIcon from "@mui/icons-material/Star"
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  useGetNoteById,
  useGetNotes,
  useUpdateNoteById,
} from "../../queries/notes.query"
import ColorPicker from "../base/ColorPicker"
import ChipNoteCategoryList from "../categories/ChipNoteCategoryList"
import NoteCategoriesSelector from "./NoteCategoriesSelector"
import { useCreateNote } from "../../queries/notes.query"

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
  const noteId = searchParams.get("noteId") || ""
  const isNewNote = noteId === "new"
  const { createNote } = useCreateNote()
  const { refetchNotes } = useGetNotes()
  const [isDefinedNote, setIsDefinedNote] = useState(false)
  const { note } = useGetNoteById(noteId)
  const [noteTitle, setNoteTitle] = useState(note?.title || undefined)
  const [noteContent, setNoteContent] = useState(note?.content || undefined)
  const [noteColor, setNoteColor] = useState(note?.color || undefined)
  const [isFavorite, setIsFavorite] = useState(note?.isFavorite || false)
  const { updateNote, isUpdatingNote } = useUpdateNoteById(noteId)
  const [showCategorySelector, setShowCategorySelector] = useState(false)

  function isEmptyNote() {
    return (
      noteContent?.replaceAll(" ", "") === "<p><br></p>" &&
      (noteTitle?.replaceAll(" ", "") || "") === ""
    )
  }

  useEffect(() => {
    if (noteId) {
      setIsDefinedNote(false)
      setNoteTitle(note?.title || "")
      setNoteContent(note?.content || "")
      setNoteColor(note?.color || "")
      setIsFavorite(note?.isFavorite || false)
      setIsDefinedNote(true)
      console.log("1 on update note...")
      console.log("2 on update note id...", noteId)
    }
  }, [noteId])

  useEffect(() => {
    if (note) {
      const timeoutId = setTimeout(() => {
        if (!isUpdatingNote && !isEmptyNote()) updateNote({ title: noteTitle })
      }, 1000)
      console.log("3 on update note title...")
      return () => clearTimeout(timeoutId)
    }
  }, [noteTitle])

  useEffect(() => {
    if (note) {
      const timeoutId = setTimeout(() => {
        if (!isUpdatingNote && !isEmptyNote())
          updateNote({ content: noteContent })
      }, 1000)
      console.log("4 on update note content...")
      return () => clearTimeout(timeoutId)
    }
  }, [noteContent])

  const handleDrawerClose = async () => {
    if (isNewNote) {
      console.log(isNewNote)
      await createNote({
        content: noteContent,
        title: noteTitle,
        color: noteColor,
      })
      refetchNotes()
    }
    searchParams.delete("noteId")
    setSearchParams(searchParams)
  }

  function handleOnChangeColor(color: string) {
    setNoteColor(color)
    if (!isNewNote) updateNote({ color })
  }

  function handleToggleIsFavorite() {
    setIsFavorite(!isFavorite)
    // Estado isFavorite no se actualizó aún, por eso se le pasa de esta forma a la nota.
    updateNote({ isFavorite: !isFavorite })
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
      PaperProps={{ sx: { backgroundColor: noteColor || "#fbf8cc" } }}
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
            <ColorPicker
              color={noteColor || ""}
              onChange={handleOnChangeColor}
            />
            <IconButton onClick={handleToggleIsFavorite}>
              {isFavorite ? (
                <StarIcon sx={{ color: "gold" }} />
              ) : (
                <StarBorderIcon />
              )}
            </IconButton>
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
          onChange={(content, delta, source, editor) => {
            // console.log("delta:", delta)
            console.log("content:", content)
            setNoteContent(content)
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        ></ReactQuill>
      </Stack>
      <Divider />
      {/* Note content */}
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() => setShowCategorySelector(!showCategorySelector)}
        >
          <BookmarkAddIcon />
        </IconButton>
        {showCategorySelector && (
          <NoteCategoriesSelector
            noteId={showCategorySelector ? noteId : undefined}
            onClose={() => setShowCategorySelector(false)}
          />
        )}
        {note && <ChipNoteCategoryList noteId={noteId} maxLen={3} />}
      </Stack>
    </Drawer>
  )
}
