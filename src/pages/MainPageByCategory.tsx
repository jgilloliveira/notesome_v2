import { Divider, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import NotesList from "../components/notes/NotesList"
import NotesListHeader from "../components/notes/NotesListHeader"
import NotesListTabs from "../components/notes/NotesListTabs"
import { useGetCategoryById } from "../queries/categories.query"
import MainPage from "./MainPage"

export default function MainPageByCategory() {
  const { categoryId } = useParams()
  const { category } = useGetCategoryById(categoryId)
  return category ? (
    <Stack>
      <NotesListHeader title={category.name} />
      <NotesListTabs />
      <Divider />
      <NotesList filter={"isFavorite"} categoryIdFilter={categoryId} />
    </Stack>
  ) : (
    <></>
  )
}
