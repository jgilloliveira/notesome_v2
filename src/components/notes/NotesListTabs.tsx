import { Stack, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { NoteFilters } from "../../queries/notes.query"

type NotesListTabsProps = { onChange: (filter?: NoteFilters) => void }

export default function NotesListTabs(props: NotesListTabsProps) {
  const [selectedTab, setSelectedTab] = useState(0)

  function handleChangeTab(e: any, index: number) {
    setSelectedTab(index)
    if (index === 1) props.onChange("isFavorite")
    else if (index === 2) props.onChange("isArchived")
    else props.onChange()
  }

  return (
    <Stack sx={{ px: 5 }}>
      <Tabs value={selectedTab} onChange={handleChangeTab}>
        <Tab label="Todos" />
        <Tab label="Favoritos" />
        <Tab label="Archivados" />
      </Tabs>
    </Stack>
  )
}
